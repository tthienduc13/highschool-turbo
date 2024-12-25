'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { RarityBadge } from '@/components/animation/tag/rarity-badge'
import { Avatar, Rarity } from '@/api/user/type'
import { IconBook, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Image from 'next/image'
import { Button } from '@highschool/ui/components/ui/button'
import { cn } from '@highschool/ui/lib/utils'

const avatars: Avatar[] = [
    {
        "id": "ba139a00-8316-4b8d-9136-5ad51b0d3e25",
        "name": "Orange Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/OrangeAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "056e9076-cdc5-4a2f-b22b-b3ddd1f3e73c",
        "name": "Brown Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/BrownAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "596f7ec9-6953-40ba-85fa-3d5a50a3e273",
        "name": "Lime Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/LimeAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "5813abf1-dcdc-456d-9206-927ed1875542",
        "name": "Blue Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/BlueAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "256f90bf-5bed-492b-bb23-0c6bd06dd939",
        "name": "Black Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/BlackAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "00ba1699-6258-4db1-b281-a4a0a0cf2713",
        "name": "Red Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/RedAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "041d17fe-0e05-4b83-8b09-77c258b4fe98",
        "name": "Tropical Globe",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/TropicalGlobe.svg",
        "rarity": 6,
        "type": "blizzard",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218"
    },
    {
        "id": "4e91e391-f6be-4e89-86f3-1c683d172e23",
        "name": "Yellow Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/YellowAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "e3aa6e82-4a02-4d01-b080-f89d22cd2a2a",
        "name": "Spooky Pumpkin",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SpookyPumpkin.svg",
        "rarity": 6,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "a0d254f9-4b77-4af1-9fa5-6e5264e42b1c",
        "name": "Pink Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/PinkAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "fff8c5b6-4e7a-4307-8439-ee9b908f240d",
        "name": "Spooky Mummy",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SpookyMummy.svg",
        "rarity": 6,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "920aa2fc-6634-4580-8e5a-00d29db6d9fb",
        "name": "Purple Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/PurpleAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "1f45b150-f4dd-4801-accf-1d4a151cb985",
        "name": "Cyan Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/CyanAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "dcaac5a5-ee04-4ce7-b4ae-f5fa16bca39a",
        "name": "Frost Wreath",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/FrostWreath.svg",
        "rarity": 6,
        "type": "blizzard",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218"
    },
    {
        "id": "5301d64e-fe4f-4ada-9868-86c13566fdfd",
        "name": "Green Atronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/GreenAtronaut.svg",
        "rarity": 6,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "095af78d-3f3c-4fee-92c0-13aa804ade1f",
        "name": "Tiger",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Tiger.svg",
        "rarity": 1,
        "type": "tropical",
        "background": "https://static.wikia.nocookie.net/blooket/images/8/85/Tropical_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095946"
    },
    {
        "id": "b5df3a0d-91f4-4ec9-acde-56a48eaabda2",
        "name": "Squirrel",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Squirrel.svg",
        "rarity": 1,
        "type": "forest",
        "background": "https://static.wikia.nocookie.net/blooket/images/2/20/Forest_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095915"
    },
    {
        "id": "192686df-4783-430e-8cbe-495a20ba4072",
        "name": "Rabbit",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Rabbit.svg",
        "rarity": 1,
        "type": "pet",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/ae/Pet_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095843"
    },
    {
        "id": "b14dbcf8-27df-4bba-9b8c-55f68e598a00",
        "name": "Moose",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Moose.svg",
        "rarity": 1,
        "type": "forest",
        "background": "https://static.wikia.nocookie.net/blooket/images/2/20/Forest_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095915"
    },
    {
        "id": "f622596f-9e81-4ce0-bf80-c022a8cbdc41",
        "name": "Bear",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Bear.svg",
        "rarity": 1,
        "type": "forest",
        "background": "https://static.wikia.nocookie.net/blooket/images/2/20/Forest_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095915"
    },
    {
        "id": "99445d31-9c1a-4bd1-9106-16d90a4d5694",
        "name": "Jaguar",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Jaguar.svg",
        "rarity": 1,
        "type": "tropical",
        "background": "https://static.wikia.nocookie.net/blooket/images/8/85/Tropical_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095946"
    },
    {
        "id": "a8e95f83-c26b-426c-b8a1-ff1a241c3515",
        "name": "Hedgehog",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Hedgehog.svg",
        "rarity": 1,
        "type": "forest",
        "background": "https://static.wikia.nocookie.net/blooket/images/2/20/Forest_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095915"
    },
    {
        "id": "239e4ed1-e5eb-4417-a10b-5a955f4b2005",
        "name": "Fox",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Fox.svg",
        "rarity": 1,
        "type": "forest",
        "background": "https://static.wikia.nocookie.net/blooket/images/2/20/Forest_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095915"
    },
    {
        "id": "2ba5b3a1-8b54-4e18-bba1-8b66beac97ff",
        "name": "Cow",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Cow.svg",
        "rarity": 1,
        "type": "farm",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/9d/Farm_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240901041153"
    },
    {
        "id": "eb5812d5-9c90-49fa-9905-e14f790259ee",
        "name": "Duck",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Duck.svg",
        "rarity": 1,
        "type": "farm",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/9d/Farm_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240901041153"
    },
    {
        "id": "db1334a7-0229-4da7-89fb-4c9ddaadca4d",
        "name": "Goat",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Goat.svg",
        "rarity": 1,
        "type": "farm",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/9d/Farm_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240901041153"
    },
    {
        "id": "8fc8432a-a9c6-42f8-90b6-e39cff03d1a7",
        "name": "Sheep",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Sheep.svg",
        "rarity": 1,
        "type": "farm",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/9d/Farm_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240901041153"
    },
    {
        "id": "f9766e19-4f19-457e-988c-3cb0c58cfca6",
        "name": "Turtle",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Turtle.svg",
        "rarity": 1,
        "type": "pet",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/ae/Pet_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095843"
    },
    {
        "id": "879f5da8-8402-47b7-9e80-546fa4a44820",
        "name": "Horse",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Horse.svg",
        "rarity": 1,
        "type": "farm",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/9d/Farm_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240901041153"
    },
    {
        "id": "8608c50e-e83e-43f4-93d7-095be6ac7daa",
        "name": "Pig",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Pig.svg",
        "rarity": 1,
        "type": "farm",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/9d/Farm_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240901041153"
    },
    {
        "id": "42e8c274-4dc0-4cbf-aef6-0df92398293d",
        "name": "Macaw",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Macaw.svg",
        "rarity": 1,
        "type": "tropical",
        "background": "https://static.wikia.nocookie.net/blooket/images/8/85/Tropical_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095946"
    },
    {
        "id": "48941683-63c3-484c-b26f-b87005b8ff6c",
        "name": "Cat",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Cat.svg",
        "rarity": 1,
        "type": "pet",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/ae/Pet_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095843"
    },
    {
        "id": "45cb9583-4d63-4c9e-89ca-ab98f8398963",
        "name": "Chicken",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Chicken.svg",
        "rarity": 1,
        "type": "farm",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/9d/Farm_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240901041153"
    },
    {
        "id": "6431aba6-ae71-4538-b93b-8fa97c032c54",
        "name": "Penguin",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Penguin.svg",
        "rarity": 1,
        "type": "arctic",
        "background": "https://static.wikia.nocookie.net/blooket/images/5/53/Arctic_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902100019"
    },
    {
        "id": "fadf7311-dfd4-4061-a66c-5e36956f6ae3",
        "name": "Raccoon",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Raccoon.svg",
        "rarity": 1,
        "type": "forest",
        "background": "https://static.wikia.nocookie.net/blooket/images/2/20/Forest_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095915"
    },
    {
        "id": "20eecf88-ac3f-40aa-a51a-cf93b1628add",
        "name": "Toucan",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Toucan.svg",
        "rarity": 1,
        "type": "tropical",
        "background": "https://static.wikia.nocookie.net/blooket/images/8/85/Tropical_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095946"
    },
    {
        "id": "0b2ae439-b884-4bbe-aaee-21ce4312905d",
        "name": "Puppy",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Puppy.svg",
        "rarity": 1,
        "type": "pet",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/ae/Pet_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095843"
    },
    {
        "id": "431270bb-241a-48bb-a30f-3b3224235056",
        "name": "Hamster",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Hamster.svg",
        "rarity": 1,
        "type": "pet",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/ae/Pet_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095843"
    },
    {
        "id": "8636cf52-6ff3-438b-b754-77d9db52b5f0",
        "name": "Kitten",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Kitten.svg",
        "rarity": 1,
        "type": "pet",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/ae/Pet_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095843"
    },
    {
        "id": "354f59c0-b0cc-4294-aadf-19451faad1a9",
        "name": "Chick",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Chick.svg",
        "rarity": 1,
        "type": "farm",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/9d/Farm_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240901041153"
    },
    {
        "id": "4ca8f7f7-6aae-4490-923c-faa2219f3dfd",
        "name": "Artic Fox",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/ArticFox.svg",
        "rarity": 1,
        "type": "arctic",
        "background": "https://static.wikia.nocookie.net/blooket/images/5/53/Arctic_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902100019"
    },
    {
        "id": "9cb99f21-8904-415c-b906-4e9729f74387",
        "name": "Goldfish",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Goldfish.svg",
        "rarity": 1,
        "type": "pet",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/ae/Pet_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095843"
    },
    {
        "id": "8cd7a1b0-8b8e-4543-be1f-819e4f5fd2ed",
        "name": "Dog",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Dog.svg",
        "rarity": 1,
        "type": "pet",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/ae/Pet_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095843"
    },
    {
        "id": "fbea53e3-fd06-4527-a22a-e07be60b385c",
        "name": "Cockatoo",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Cockatoo.svg",
        "rarity": 1,
        "type": "tropical",
        "background": "https://static.wikia.nocookie.net/blooket/images/8/85/Tropical_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095946"
    },
    {
        "id": "1566cacb-9471-4e93-89c6-311e9c8220d1",
        "name": "Baby Penguin",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/BabyPenguin.svg",
        "rarity": 1,
        "type": "arctic",
        "background": "https://static.wikia.nocookie.net/blooket/images/5/53/Arctic_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902100019"
    },
    {
        "id": "3126554d-bc76-42cb-858b-166c076e8567",
        "name": "Polar Bear",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/PolarBear.svg",
        "rarity": 1,
        "type": "arctic",
        "background": "https://static.wikia.nocookie.net/blooket/images/5/53/Arctic_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902100019"
    },
    {
        "id": "82f77dbd-9a93-407f-931b-2faf7c8444fa",
        "name": "Artic Hare",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/ArticHare.svg",
        "rarity": 1,
        "type": "arctic",
        "background": "https://static.wikia.nocookie.net/blooket/images/5/53/Arctic_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902100019"
    },
    {
        "id": "978fd79f-9af6-48b9-a468-a254bd83da3d",
        "name": "Seal",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Seal.svg",
        "rarity": 1,
        "type": "arctic",
        "background": "https://static.wikia.nocookie.net/blooket/images/5/53/Arctic_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902100019"
    },
    {
        "id": "a4dadd5e-6073-4a61-a627-4a8640a31ba7",
        "name": "Walrus",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Walrus.svg",
        "rarity": 1,
        "type": "arctic",
        "background": "https://static.wikia.nocookie.net/blooket/images/5/53/Arctic_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902100019"
    },
    {
        "id": "c5ac946e-fcc4-4b22-b5d6-4d8741011f5e",
        "name": "Snow Owl",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SnowOwl.svg",
        "rarity": 1,
        "type": "arctic",
        "background": "https://static.wikia.nocookie.net/blooket/images/5/53/Arctic_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902100019"
    },
    {
        "id": "ab8a6e3f-609a-422a-bd28-2d521b45eded",
        "name": "Orangutan",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Orangutan.svg",
        "rarity": 1,
        "type": "tropical",
        "background": "https://static.wikia.nocookie.net/blooket/images/8/85/Tropical_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095946"
    },
    {
        "id": "7b1eac34-7f88-4715-9def-a82f3c91c7ae",
        "name": "Capuchin",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Capuchin.svg",
        "rarity": 1,
        "type": "tropical",
        "background": "https://static.wikia.nocookie.net/blooket/images/8/85/Tropical_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095946"
    },
    {
        "id": "41f4e9e5-44f9-42a6-9e89-a160cf2cda71",
        "name": "Panther",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Panther.svg",
        "rarity": 1,
        "type": "tropical",
        "background": "https://static.wikia.nocookie.net/blooket/images/8/85/Tropical_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095946"
    },
    {
        "id": "2927adeb-6cef-4bcf-a926-0eeb52a144bf",
        "name": "Parrot",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Parrot.svg",
        "rarity": 1,
        "type": "tropical",
        "background": "https://static.wikia.nocookie.net/blooket/images/8/85/Tropical_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095946"
    },
    {
        "id": "c2c9f72e-ab32-4573-baed-1b1203e4f0ab",
        "name": "Owl",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Owl.svg",
        "rarity": 1,
        "type": "forest",
        "background": "https://static.wikia.nocookie.net/blooket/images/2/20/Forest_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095915"
    },
    {
        "id": "21850526-c6c5-4dec-a902-0a6bb1779ccc",
        "name": "Anaconda",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Anaconda.svg",
        "rarity": 1,
        "type": "tropical",
        "background": "https://static.wikia.nocookie.net/blooket/images/8/85/Tropical_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095946"
    },
    {
        "id": "6c883fa9-4cc0-4696-8ea5-5a2a5c906ce2",
        "name": "Brainy Bot",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/BrainyBot.svg",
        "rarity": 4,
        "type": "bot",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/99/Bot_Background.png/revision/latest/scale-to-width-down/200?cb=20240831094722"
    },
    {
        "id": "a633ef10-d32f-49d1-9ebc-6530b7cd9efa",
        "name": "Unicorn",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Unicorn.svg",
        "rarity": 4,
        "type": "medieval",
        "background": "https://static.wikia.nocookie.net/blooket/images/b/bd/Medieval_Background.png/revision/latest/scale-to-width-down/200?cb=20240831061322"
    },
    {
        "id": "840ecf7d-f178-42b5-92f5-24c07387b193",
        "name": "Werewolf",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Werewolf.svg",
        "rarity": 4,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "ae2f75b7-f828-4d45-94bc-25a022cd65e1",
        "name": "Catterpillar",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Catterpillar.svg",
        "rarity": 4,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "f5ca23cd-0092-4a8c-ad8c-5eaccf1bdb4b",
        "name": "Mad Hatter",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/MadHatter.svg",
        "rarity": 4,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "849556d5-e1e9-4c38-8146-b229a7e55208",
        "name": "Snowman",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Snowman.svg",
        "rarity": 4,
        "type": "blizzard",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218"
    },
    {
        "id": "6c1f1b44-4157-48c9-88e5-6908a4b7716e",
        "name": "French Toast",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/FrenchToast.svg",
        "rarity": 4,
        "type": "breakfast",
        "background": "https://static.wikia.nocookie.net/blooket/images/1/14/Breakfast_Background.png/revision/latest/scale-to-width-down/200?cb=20240831044820"
    },
    {
        "id": "fc153b43-edb0-4338-be89-50dfed8355c3",
        "name": "Pizza",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Pizza.svg",
        "rarity": 4,
        "type": "breakfast",
        "background": "https://static.wikia.nocookie.net/blooket/images/1/14/Breakfast_Background.png/revision/latest/scale-to-width-down/200?cb=20240831044820"
    },
    {
        "id": "a183cbef-8bb7-4b5d-80a8-f2a3094475ba",
        "name": "Spaceship",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Spaceship.svg",
        "rarity": 4,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "0fe6c06a-b49a-4112-851a-8e8d3a605a8e",
        "name": "Santa Claus",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SantaClaus.svg",
        "rarity": 5,
        "type": "blizzard",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218"
    },
    {
        "id": "45f70f7e-a668-4e9a-8e79-6ac2cbb77651",
        "name": "Mega Bot",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/MegaBot.svg",
        "rarity": 5,
        "type": "bot",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/99/Bot_Background.png/revision/latest/scale-to-width-down/200?cb=20240831094722"
    },
    {
        "id": "1eb5dce4-c55a-48fd-8620-13e78c0326a3",
        "name": "Ghost",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Ghost.svg",
        "rarity": 5,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "eb3474b7-dab4-4c3f-8a4e-cd933cf6b6a5",
        "name": "King of Hearts",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/KingofHearts.svg",
        "rarity": 5,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "e8c2fd85-1cf8-4b6d-9186-c7a70f382797",
        "name": "Astronaut",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Astronaut.svg",
        "rarity": 5,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "800ffb75-2453-4a96-b7ac-c97a334cf31c",
        "name": "King",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/King.svg",
        "rarity": 5,
        "type": "medieval",
        "background": "https://static.wikia.nocookie.net/blooket/images/b/bd/Medieval_Background.png/revision/latest/scale-to-width-down/200?cb=20240831061322"
    },
    {
        "id": "fc10e957-f6cc-4c73-a14c-1ad854a04887",
        "name": "Spooky Ghost",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SpookyGhost.svg",
        "rarity": 8,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "8cf3fcc1-84ed-42a5-aade-96f8a0273dd0",
        "name": "Mummy",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Mummy.svg",
        "rarity": 3,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "fc07ad37-3f9b-499a-b903-41f8dd6294a8",
        "name": "Buddy Bot",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/BuddyBot.svg",
        "rarity": 3,
        "type": "bot",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/99/Bot_Background.png/revision/latest/scale-to-width-down/200?cb=20240831094722"
    },
    {
        "id": "a90ce7ef-1e6d-40b6-b317-9d1f776c7459",
        "name": "Planet",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Planet.svg",
        "rarity": 3,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "b8b2d27d-e0d4-47b3-a2b3-25aa17da1508",
        "name": "Dragon",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Dragon.svg",
        "rarity": 3,
        "type": "medieval",
        "background": "https://static.wikia.nocookie.net/blooket/images/b/bd/Medieval_Background.png/revision/latest/scale-to-width-down/200?cb=20240831061322"
    },
    {
        "id": "54a389d8-3591-4f65-9900-86129854a85d",
        "name": "UFO",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/UFO.svg",
        "rarity": 3,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "a1107227-9b1e-48f9-9619-4d9f067a533f",
        "name": "Cheshire Cat",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/CheshireCat.svg",
        "rarity": 3,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "a8447275-3e5a-4797-98fe-7044e2d149f3",
        "name": "White Rabbit",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/WhiteRabbit.svg",
        "rarity": 3,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "98afc8a8-36d1-41ef-9134-ee5422c5d331",
        "name": "Pancakes",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Pancakes.svg",
        "rarity": 3,
        "type": "breakfast",
        "background": "https://static.wikia.nocookie.net/blooket/images/1/14/Breakfast_Background.png/revision/latest/scale-to-width-down/200?cb=20240831044820"
    },
    {
        "id": "b381631c-7be0-4094-9682-f1bcb8d54d85",
        "name": "Watson",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Watson.svg",
        "rarity": 3,
        "type": "bot",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/99/Bot_Background.png/revision/latest/scale-to-width-down/200?cb=20240831094722"
    },
    {
        "id": "184dd33b-199b-461c-a636-dcec4ff7c50e",
        "name": "Gingerbread Man",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/GingerbreadMan.svg",
        "rarity": 3,
        "type": "blizzard",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218"
    },
    {
        "id": "6467e6c4-c701-477e-97a0-40fc169f3761",
        "name": "Queen",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Queen.svg",
        "rarity": 3,
        "type": "medieval",
        "background": "https://static.wikia.nocookie.net/blooket/images/b/bd/Medieval_Background.png/revision/latest/scale-to-width-down/200?cb=20240831061322"
    },
    {
        "id": "157e9594-9788-4725-96da-50eecde0fa51",
        "name": "Waffle",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Waffle.svg",
        "rarity": 3,
        "type": "breakfast",
        "background": "https://static.wikia.nocookie.net/blooket/images/1/14/Breakfast_Background.png/revision/latest/scale-to-width-down/200?cb=20240831044820"
    },
    {
        "id": "e7b9d8f7-b1ff-4494-9b31-f4382212aa63",
        "name": "Jester",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Jester.svg",
        "rarity": 3,
        "type": "medieval",
        "background": "https://static.wikia.nocookie.net/blooket/images/b/bd/Medieval_Background.png/revision/latest/scale-to-width-down/200?cb=20240831061322"
    },
    {
        "id": "02d4b320-4c42-4335-b461-3d2a55222546",
        "name": "Gingerbread House",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/GingerbreadHouse.svg",
        "rarity": 3,
        "type": "blizzard",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218"
    },
    {
        "id": "ca9919ba-cd5f-4e89-b524-008117a10303",
        "name": "Dormouse",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Dormouse.svg",
        "rarity": 3,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "57bdde6d-1c5f-4af9-b5ba-0a753b7b574c",
        "name": "Toast",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Toast.svg",
        "rarity": 2,
        "type": "breakfast",
        "background": "https://static.wikia.nocookie.net/blooket/images/1/14/Breakfast_Background.png/revision/latest/scale-to-width-down/200?cb=20240831044820"
    },
    {
        "id": "ba2e4043-7847-4e14-b60f-fbe2e928129b",
        "name": "Breakfast Combo",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/BreakfastCombo.svg",
        "rarity": 2,
        "type": "breakfast",
        "background": "https://static.wikia.nocookie.net/blooket/images/1/14/Breakfast_Background.png/revision/latest/scale-to-width-down/200?cb=20240831044820"
    },
    {
        "id": "ccd26250-a2f8-462e-bc30-aa7be907287f",
        "name": "Angry Bot",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/AngryBot.svg",
        "rarity": 2,
        "type": "bot",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/99/Bot_Background.png/revision/latest/scale-to-width-down/200?cb=20240831094722"
    },
    {
        "id": "63b615cb-853f-4e38-b965-319ce73b28fa",
        "name": "Cereal",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Cereal.svg",
        "rarity": 2,
        "type": "breakfast",
        "background": "https://static.wikia.nocookie.net/blooket/images/1/14/Breakfast_Background.png/revision/latest/scale-to-width-down/200?cb=20240831044820"
    },
    {
        "id": "5015331a-da46-480c-9d11-79801fb0e36d",
        "name": "Yogurt",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Yogurt.svg",
        "rarity": 2,
        "type": "breakfast",
        "background": "https://static.wikia.nocookie.net/blooket/images/1/14/Breakfast_Background.png/revision/latest/scale-to-width-down/200?cb=20240831044820"
    },
    {
        "id": "79856a19-638e-408c-85b7-eb470f36a892",
        "name": "Alice",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Alice.svg",
        "rarity": 2,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "58e95a97-4067-48fa-bc6d-f114a95dcc05",
        "name": "Alien",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Alien.svg",
        "rarity": 2,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "eb9a358e-1d4f-4f34-8186-d2ce1c0d59f3",
        "name": "Swamp Monster",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SwampMonster.svg",
        "rarity": 2,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "b4375757-4429-4b20-81aa-e5597755e1e6",
        "name": "Zombie",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Zombie.svg",
        "rarity": 2,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "568eb3ba-98a9-4b7d-a517-303ffbcf849f",
        "name": "Stars",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Stars.svg",
        "rarity": 2,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "b4ecede0-4fac-48f3-88ae-a0916ffc3974",
        "name": "Meteor",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Meteor.svg",
        "rarity": 2,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "f452f722-58c4-4906-b46a-fdd5284d325d",
        "name": "Milk",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Milk.svg",
        "rarity": 2,
        "type": "breakfast",
        "background": "https://static.wikia.nocookie.net/blooket/images/1/14/Breakfast_Background.png/revision/latest/scale-to-width-down/200?cb=20240831044820"
    },
    {
        "id": "4940744f-9fbe-4d0a-a1f4-01517028957c",
        "name": "Elf",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Elf.svg",
        "rarity": 2,
        "type": "medieval",
        "background": "https://static.wikia.nocookie.net/blooket/images/b/bd/Medieval_Background.png/revision/latest/scale-to-width-down/200?cb=20240831061322"
    },
    {
        "id": "4d9b7b40-dbc1-43b4-9259-033c94f01942",
        "name": "Witch",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Witch.svg",
        "rarity": 2,
        "type": "medieval",
        "background": "https://static.wikia.nocookie.net/blooket/images/b/bd/Medieval_Background.png/revision/latest/scale-to-width-down/200?cb=20240831061322"
    },
    {
        "id": "5a3b95fa-7174-42a0-bc56-c39d3e3342ec",
        "name": "Wizard",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Wizard.svg",
        "rarity": 2,
        "type": "medieval",
        "background": "https://static.wikia.nocookie.net/blooket/images/b/bd/Medieval_Background.png/revision/latest/scale-to-width-down/200?cb=20240831061322"
    },
    {
        "id": "e81d087f-baa5-46b7-b489-084b495e2d1c",
        "name": "Slime Monster",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SlimeMonster.svg",
        "rarity": 2,
        "type": "medieval",
        "background": "https://static.wikia.nocookie.net/blooket/images/b/bd/Medieval_Background.png/revision/latest/scale-to-width-down/200?cb=20240831061322"
    },
    {
        "id": "3e385937-c63d-43df-aa5f-9ce1d9a52124",
        "name": "Holiday Gift",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/HolidayGift.svg",
        "rarity": 2,
        "type": "blizzard",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218"
    },
    {
        "id": "687e3ae2-2d45-434b-9b39-4735f981d5da",
        "name": "Hot Chocolate",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/HotChocolate.svg",
        "rarity": 2,
        "type": "blizzard",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218"
    },
    {
        "id": "9dd50fe2-7f30-4339-88fc-c6677ce5c739",
        "name": "Lil Bot",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/LilBot.svg",
        "rarity": 2,
        "type": "bot",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/99/Bot_Background.png/revision/latest/scale-to-width-down/200?cb=20240831094722"
    },
    {
        "id": "b511ab9b-ee20-43fb-920c-3215a6ca8dc9",
        "name": "Holiday Wreath",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/HolidayWreath.svg",
        "rarity": 2,
        "type": "blizzard",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218"
    },
    {
        "id": "cae17ad6-0d9e-4ff9-b26a-00e4a6441491",
        "name": "Snow Globe",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SnowGlobe.svg",
        "rarity": 2,
        "type": "blizzard",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/92/BlizzardPackBackground.webp/revision/latest/scale-to-width-down/200?cb=20221116001218"
    },
    {
        "id": "39252589-4415-41d1-bdf8-723a4792cdd7",
        "name": "Earth",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Earth.svg",
        "rarity": 2,
        "type": "space",
        "background": "https://static.wikia.nocookie.net/blooket/images/f/f5/Space_Background.png/revision/latest/scale-to-width-down/200?cb=20240831095914"
    },
    {
        "id": "346e9baa-e262-4f00-934c-77bb10fa39fd",
        "name": "lovely Bot",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/lovelyBot.svg",
        "rarity": 2,
        "type": "bot",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/99/Bot_Background.png/revision/latest/scale-to-width-down/200?cb=20240831094722"
    },
    {
        "id": "b15076cd-28b0-4b0c-ac5d-498594494421",
        "name": "Vampire",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Vampire.svg",
        "rarity": 2,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "64246c02-7b90-4704-a30d-fbafc8b87ad0",
        "name": "Happy Bot",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/HappyBot.svg",
        "rarity": 2,
        "type": "bot",
        "background": "https://static.wikia.nocookie.net/blooket/images/9/99/Bot_Background.png/revision/latest/scale-to-width-down/200?cb=20240831094722"
    },
    {
        "id": "f35943e7-41bb-487b-a84f-8913058fa73b",
        "name": "Pumpkin",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Pumpkin.svg",
        "rarity": 2,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "3968616d-6fe0-43b7-9520-2e6a82ad1cd7",
        "name": "Eat Me",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/EatMe.svg",
        "rarity": 2,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "0d221798-be16-4529-a077-b8fba3fc70de",
        "name": "Queen of Hearts",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/QueenofHearts.svg",
        "rarity": 2,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "cb754825-90cc-417e-be95-238ca663269a",
        "name": "Two of Spades",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691287/HighSchool/avatars/game/TwoofSpades.svg",
        "rarity": 2,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "311b2860-d0bb-4953-8dd4-7b2f410632e9",
        "name": "Frankenstein",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Frankenstein.svg",
        "rarity": 2,
        "type": "spooky",
        "background": "https://static.wikia.nocookie.net/blooket/images/c/c7/Highlighted_background_spooky_square_corners.svg.svg/revision/latest/scale-to-width-down/200?cb=20221029004225"
    },
    {
        "id": "ef604487-0ac8-43d0-bc70-9950785916cb",
        "name": "Fairy",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/Fairy.svg",
        "rarity": 2,
        "type": "medieval",
        "background": "https://static.wikia.nocookie.net/blooket/images/b/bd/Medieval_Background.png/revision/latest/scale-to-width-down/200?cb=20240831061322"
    },
    {
        "id": "2c82513b-6732-4f9b-af37-d1ec475c4142",
        "name": "Drink Me",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/DrinkMe.svg",
        "rarity": 2,
        "type": "wonderland",
        "background": "https://static.wikia.nocookie.net/blooket/images/a/a0/Wonderland_Background.png/revision/latest/scale-to-width-down/200?cb=20240831045740"
    },
    {
        "id": "2c23493d-2f9f-4e91-8a3f-295a138d9186",
        "name": "Orange Juice",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/OrangeJuice.svg",
        "rarity": 2,
        "type": "breakfast",
        "background": "https://static.wikia.nocookie.net/blooket/images/1/14/Breakfast_Background.png/revision/latest/scale-to-width-down/200?cb=20240831044820"
    },
    {
        "id": "fc07ad37-3f9b-499a-b903-41f8dd6294a1",
        "name": "Wise Owl",
        "image": "https://res.cloudinary.com/dhdyel6be/image/upload/v1734972271/HighSchool/avatars/game/WiseOwl.webp",
        "rarity": 7,
        "type": "forest",
        "background": "https://static.wikia.nocookie.net/blooket/images/2/20/Forest_Animal_Background.png/revision/latest/scale-to-width-down/200?cb=20240902095915"
    }
]

const ITEMS_PER_PAGE = 16

interface BookAvatarProps {
    avatars: Avatar[]
}

export const BookAvatar = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const totalPages = Math.ceil(avatars.length / ITEMS_PER_PAGE)

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1)
        }
    }

    // Animation variants for the container
    const containerVariants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    // Animation variants for each animal card
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.8,
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.8,
            transition: {
                duration: 0.3
            }
        }
    }

    const renderColorTag = (rarity: number) => {
        const baseColor = 'bg-gradient-to-r'
        switch (rarity) {
            case 1:
                return `${baseColor} bg-gray-400`
            case 2:
                return `${baseColor} bg-green-400`
            case 3:
                return `${baseColor} bg-blue-400`
            case 4:
                return `${baseColor} bg-purple-400`
            case 5:
                return `${baseColor} bg-yellow-400`
            case 6:
                return `${baseColor} bg-pink-400`
            case 7:
                return `${baseColor} bg-red-400`
            case 8:
                return `${baseColor} bg-indigo-400`
            case 9:
                return `${baseColor} bg-amber-400`
            default:
                return `${baseColor} bg-gray-400`
        }
    }

    const AnimalCard = ({ avatar }: { avatar: Avatar }) => (
        <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="group relative"
        >
            <RarityBadge rarity={avatar.rarity} />
            <div className={`absolute -inset-0.5 rounded-xl opacity-0 blur transition duration-500 group-hover:opacity-100 ${renderColorTag(avatar.rarity)}`} />
            <div className="relative flex flex-col items-center gap-2 rounded-lg bg-white p-2 shadow-sm ring-1 ring-amber-900/5">
                <div className="overflow-hidden rounded-lg">
                    <Image
                        src={avatar.image ?? ""}
                        alt={avatar.name}
                        width={100} height={100}
                        className="h-12 w-12 object-cover xl:h-20 xl:w-20"
                    />
                </div>
                <span className="text-sm font-medium text-amber-900">
                    {avatar.name}
                </span>
            </div>
        </motion.div>
    )

    return (
        <div className="w-[56vw] h-[80vh]">

            {/* Book container */}
            <div className="relative mx-auto aspect-[2/1.4]">
                {/* Book binding and shadow */}
                <div className="absolute inset-0 rounded-lg bg-game-winter shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]" />
                    <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 " />
                </div>

                {/* Book pages container */}
                <div className="relative mx-auto grid h-full grid-cols-2 gap-px overflow-hidden rounded-l p-4">
                    {/* Left page */}
                    <div className="relative rounded-l-lg bg-[#fffbf2] p-6">
                        <div className="absolute inset-y-0 right-0 w-8" />
                        <div className="absolute bottom-0 left-0 right-0 h-8" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
                            >
                                {avatars
                                    .slice(
                                        currentPage * ITEMS_PER_PAGE,
                                        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE / 2
                                    )
                                    .map((avatar) => (
                                        <AnimalCard key={avatar.id} avatar={avatar} />
                                    ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right page */}
                    <div className="relative rounded-r-lg bg-[#fffbf2] p-6">
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-l from-transparent to-black/5" />
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/5 to-transparent" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="grid md:grid-cols-2 xl:grid-cols-4 gap-4"
                            >
                                {avatars
                                    .slice(
                                        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE / 2,
                                        (currentPage + 1) * ITEMS_PER_PAGE
                                    )
                                    .map((avatar) => (
                                        <AnimalCard key={avatar.id} avatar={avatar} />
                                    ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation buttons */}
                    <Button
                        variant="ghost"
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={cn(
                            "absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm hover:bg-white",
                            (currentPage === 0) && "opacity-50"
                        )}
                    >
                        <IconChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                        className={cn(
                            "absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm hover:bg-white",
                            (currentPage === totalPages - 1) && "opacity-50"
                        )}
                    >
                        <IconChevronRight className="h-6 w-6" />
                    </Button>
                </div>

                {/* Page numbers */}
                <div className="-mt-[2.2rem] text-center font-serif text-lg text-amber-900">
                    <span className="inline-block rounded-md bg-white/80 px-4 py-1 backdrop-blur-sm">
                        Page {currentPage + 1} of {totalPages}
                    </span>
                </div>
            </div>

        </div>
    )
}