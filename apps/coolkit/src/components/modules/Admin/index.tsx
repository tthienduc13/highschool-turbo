import { Ket } from "@highschool/interfaces/ket";

import { AdminHeader } from "@/components/core/commons/admin-layout/header";
import { Container } from "@/components/core/commons/container";
import { KetCard } from "@/components/core/commons/ket-card";
import { WithFooter } from "@/components/core/commons/with-footer";

const data: Ket = {
  id: "a04e6243-6b75-40b9-816f-a52a0c049c2e",
  name: "Ancient Civilizations",
  description: "Discover the wonders and mysteries of ancient societies.",
  totalQuestion: 10,
  totalPlay: 0,
  thumbnail:
    "https://res.cloudinary.com/dhdyel6be/image/upload/v1735695077/HighSchool/thumbnail-game/pvz6ochdek2lyscrlcpa.jpg",
  status: "Public",
  createdAt: new Date(),
  updatedAt: new Date(),
  author: {
    id: "0193e999-8784-7f6d-e2c3-8b977cdd33ea",
    displayName: "Lê Huy",
    avatar:
      "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SnowOwl.svg",
  },
};

function AdminModule() {
  return (
    <div className="mx-auto w-full items-center justify-center">
      <WithFooter>
        <Container maxWidth="7xl">
          <KetCard ket={data} />
        </Container>
      </WithFooter>
    </div>
  );
}
export default AdminModule;
