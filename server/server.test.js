const buddyRoute = require("./routes/buddy.router");
const userRoute = require("./routes/user.router");
const testServer = require("supertest");
const app = require("./server.js");

test("Log in works", async () => {
    const response = await testServer(app).post("/api/user/login").send({username: "bill", password: "1111"});
    expect(response.statusCode).toBe(200);
});