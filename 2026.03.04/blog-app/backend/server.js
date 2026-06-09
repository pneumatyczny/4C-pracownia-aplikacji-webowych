const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let posts = [
  { id: 1, title: "Pierwszy post", body: "Treść posta", userId: 1 },
  {
    id: 2,
    title: "Zgubiony kot",
    body: "Cześć wszystkim, smutna informacja — dzisiaj zgubił mi się kot. Jeśli ktoś go widział to proszę o kontakt :)",
    userId: 2,
  },
  {
    id: 3,
    title: "Komunikat specjalny",
    body: "A więc wojna. Z dniem dzisiejszym wszelkie sprawy i zagadnienia schodzą na plan dalszy. Całe nasze życie publiczne i prywatne przestawiamy na specjalne tory. Weszliśmy w okres wojny. Cały wysiłek narodu musi iść w jednym kierunku. Wszyscy jesteśmy żołnierzami. Musimy myśleć tylko o jednym: walka aż do zwycięstwa.",
    userId: 3,
  },
];

let comments = [
  { id: 1, postId: 1, body: "Super post!" },
  { id: 1, postId: 3, body: "Jeszcze Polska nie zginęła!" },
];

let users = [
  {
    id: 1,
    name: "Jan Kowalski",
    email: "jan@test.pl",
  },
  {
    id: 2,
    name: "Anna Nowak",
    email: "anna@test.pl",
  },
  {
    id: 3,
    name: "Józef Małgorzewski",
    email: "malgorzewski@polskieradio.pl",
  },
];

//LISTA POSTÓW
app.get("/posts", (req, res) => {
  res.json(posts);
});

//POJEDYNCZY POST
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  res.json(post);
});

//KOMENTARZE
app.get("/posts/:id/comments", (req, res) => {
  res.json(comments.filter((c) => c.postId == req.params.id));
});

//AUTORZY
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  res.json(user);
});

//DODAJ KOMENTARZ
app.post("/posts/:id/comments", (req, res) => {
  const newComment = {
    id: comments.length + 1,
    postId: Number(req.params.id),
    body: req.body.body,
  };

  comments.push(newComment);
  res.json(newComment);
});

app.listen(5000, () => {
  console.log("Server działa na http://localhost:5000");
});
