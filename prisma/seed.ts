import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getArts().map((art) => {
      return db.art.create({ data: art });
    })
  );
}
seed();

function getArts() {
  return [
    {
      title: "Inception",
      creator: "Christopher Nolan",
      description:
        "A mind-bending science fiction film about thieves who enter people's dreams to steal their secrets.",
      imageUrl: "https://example.com/inception.jpg",
      imageAltText: "Poster for the film Inception",
      creationDate: "2010-07-08T00:00:00Z",
    },
    {
      title: "Starry Night",
      creator: "Vincent van Gogh",
      description:
        "A famous painting depicting a swirling night sky over a tranquil village.",
      imageUrl: "https://example.com/starry-night.jpg",
      imageAltText: "Painting of Starry Night by Vincent van Gogh",
      creationDate: "1889-06-18T00:00:00Z",
    },
    {
      title: "The One Where Everybody Finds Out",
      creator: "Marta Kauffman, David Crane",
      description:
        "A hilarious episode from the TV show Friends where the group finds out about Chandler and Monica's relationship.",
      imageUrl: "https://example.com/friends-episode.jpg",
      imageAltText:
        "Image from the Friends episode 'The One Where Everybody Finds Out'",
      creationDate: "1999-02-11T00:00:00Z",
    },
    {
      title: "To Kill a Mockingbird",
      creator: "Harper Lee",
      description:
        "A classic novel that explores themes of racial injustice and moral growth through the eyes of a young girl named Scout Finch.",
      imageUrl: "https://example.com/to-kill-a-mockingbird.jpg",
      imageAltText: "Cover of the book 'To Kill a Mockingbird' by Harper Lee",
      creationDate: "1960-07-11T00:00:00Z",
    },
    {
      title: "Bohemian Rhapsody",
      creator: "Queen",
      description:
        "An iconic rock song with a unique structure that weaves together different musical styles and emotions.",
      imageUrl: "https://example.com/bohemian-rhapsody.jpg",
      imageAltText: "Album cover of 'Bohemian Rhapsody' by Queen",
      creationDate: "1975-10-31T00:00:00Z",
    },
    {
      title: "Ficciones",
      creator: "Jorge Luis Borges",
      description:
        "A collection of imaginative and thought-provoking short stories that explore philosophical themes and challenge traditional narrative structures.",
      imageUrl: "https://example.com/ficciones.jpg",
      imageAltText: "Cover of the book 'Ficciones' by Jorge Luis Borges",
      creationDate: "1944-04-01T00:00:00Z",
    },
    {
      title: "The Aleph",
      creator: "Jorge Luis Borges",
      description:
        "A mesmerizing short story that delves into the concept of infinity through a mystical and cosmic lens.",
      imageUrl: "https://example.com/the-aleph.jpg",
      imageAltText: "Image of 'The Aleph' short story by Jorge Luis Borges",
      creationDate: "1949-04-01T00:00:00Z",
    },
  ];
}
