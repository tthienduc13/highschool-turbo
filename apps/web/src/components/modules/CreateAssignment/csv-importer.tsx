import { useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { toast } from "sonner";
import { IconFileUpload } from "@tabler/icons-react";
import Papa from "papaparse";

interface CsvImporterProps {
  onImport: (data: any[]) => void;
}

export function CsvImporter({ onImport }: CsvImporterProps) {
  const [isImporting, setIsImporting] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast.error("Định dạng không hợp lệ", {
        description: "Vui lòng chọn file CSV",
      });

      return;
    }

    setIsImporting(true);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          toast.error("Lỗi khi đọc file CSV", {
            description: results.errors[0].message,
          });
          setIsImporting(false);

          return;
        }

        try {
          const importedData = validateAndTransformData(results.data);

          onImport(importedData);
          setIsImporting(false);
        } catch (error: any) {
          toast.error("Lỗi dữ liệu", {
            description: error.message || "Dữ liệu CSV không đúng định dạng",
          });
          setIsImporting(false);
        }
      },
      error: (error) => {
        toast.error("Lỗi khi đọc file", {
          description: error.message,
        });
        setIsImporting(false);
      },
    });

    // Reset input để có thể upload cùng một file nhiều lần
    event.target.value = "";
  };

  // Xác thực và chuyển đổi dữ liệu
  const validateAndTransformData = (data: any[]): any[] => {
    if (!data || data.length === 0) {
      throw new Error("File CSV không có dữ liệu");
    }

    const requiredColumns = [
      "question",
      "correct_answer",
      "answer_a",
      "answer_b",
    ];
    const firstRow = data[0];

    // Kiểm tra các cột bắt buộc
    for (const column of requiredColumns) {
      if (!(column in firstRow)) {
        throw new Error(
          `Thiếu cột bắt buộc: ${column}. Vui lòng tải xuống template mẫu.`,
        );
      }
    }

    // Chuyển đổi định dạng dữ liệu để phù hợp với form
    return data.map((row, index) => {
      // Tạo mảng câu trả lời từ các cột answer_a, answer_b, answer_c, answer_d
      const answers = [];

      if ("answer_a" in row && row.answer_a) answers.push(row.answer_a);
      if ("answer_b" in row && row.answer_b) answers.push(row.answer_b);
      if ("answer_c" in row && row.answer_c) answers.push(row.answer_c);
      if ("answer_d" in row && row.answer_d) answers.push(row.answer_d);

      // Tìm vị trí đáp án đúng
      let correctAnswerIndex = 0;
      const correctAnswer = row.correct_answer?.toString().trim() || "";

      if (correctAnswer) {
        // Kiểm tra nếu correct_answer là một chữ cái (A, B, C, D)
        if (/^[A-Da-d]$/.test(correctAnswer)) {
          correctAnswerIndex = correctAnswer.toUpperCase().charCodeAt(0) - 65; // 'A' = 0, 'B' = 1, ...
        } else {
          // Kiểm tra nếu correct_answer là nội dung của đáp án
          const index = answers.findIndex(
            (ans) => ans?.toString().trim() === correctAnswer,
          );

          if (index !== -1) {
            correctAnswerIndex = index;
          }
        }
      }

      // Đảm bảo correctAnswerIndex nằm trong phạm vi hợp lệ
      if (correctAnswerIndex < 0 || correctAnswerIndex >= answers.length) {
        correctAnswerIndex = 0;
      }

      return {
        question: row.question || `Câu hỏi ${index + 1}`,
        answers: answers.length > 0 ? answers : [""],
        correctAnswer: correctAnswerIndex,
      };
    });
  };

  // Tạo và tải xuống file template CSV
  const downloadTemplate = () => {
    const templateData = `question,correct_answer,answer_a,answer_b,answer_c,answer_d
"What is the capital of France?",A,Paris,London,Berlin,Madrid
"Which planet is known as the Red Planet?",C,Earth,Venus,Mars,Jupiter`;

    const blob = new Blob([templateData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "assignment_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="flex items-center gap-2"
        disabled={isImporting}
        size="sm"
        type="button"
        variant="outline"
        onClick={() => document.getElementById("csv-upload")?.click()}
      >
        <IconFileUpload className="size-4" />
        {isImporting ? "Đang nhập..." : "Nhập từ CSV"}
      </Button>
      <input
        accept=".csv"
        className="hidden"
        disabled={isImporting}
        id="csv-upload"
        type="file"
        onChange={handleFileUpload}
      />
      <button
        className="mt-1 text-xs text-blue-500 hover:underline"
        type="button"
        onClick={downloadTemplate}
      >
        Tải xuống template
      </button>
    </div>
  );
}
