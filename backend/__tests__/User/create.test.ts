/*import sequelize from "../../src/db"; // Adjust to the correct Sequelize instance import
import request from "supertest";
import app from "../../src/routes/index"; // Replace with the path to your app entry point
import { describe, it } from "node:test"; // Use node's `test` module

let server: any;

// Before all tests, sync the database
beforeAll(async () => {
    await sequelize.sync(); // Sync the database
    server = app.listen(3000); // start the server
});

// After all tests, close the Sequelize connection
afterAll(async () => {
    if (server) await server.close(); // Close the Express Server
    await sequelize.close(); // Close the Sequelize connection
});

describe("User Routes", () => {

    it("Should create a new user successfully", async () => {
        const testUser = {
            username: "testuser",
            password: "password123",
            email: "testuser@example.com",
            mobileNumber: "1234567890",
        };

        const response = await request(app)
            .post("/api/users")
            .set("Content-Type", "application/json")
            .send(testUser);

        // Positive case assertions

        expect(response.status).toBe(201); // HTTP 201 Created
        expect(response.body).toHaveProperty("message", "User created successfully"); // Success message
        expect(response.body).toHaveProperty("user"); // User object exists in the response
        expect(response.body.user).toHaveProperty("id"); // User ID is generated
        expect(response.body.user).toHaveProperty("username", testUser.username); // Username matches
        expect(response.body.user).toHaveProperty("email", testUser.email); // Email matches
        expect(response.body.user).not.toHaveProperty("password"); // Ensure password is not returned
    });

    it("Should fail to create a user with invalid data", async () => {
        const invalidUser = {
            username: "ab", // Too short
            password: "123", // Too short
            email: "invalidemail", // Invalid email format
            mobileNumber: "12345", // Too short
        };

        const response = await request(app)
            .post("/api/users")
            .set("Content-Type", "application/json")
            .send(invalidUser);

        // Negative case assertions
        expect(response.status).toBe(400); // HTTP 400 Bad Request
        expect(response.body).toHaveProperty("error"); // Error object exists
        expect(response.body.error).toContain("validation"); // Error mentions validation
    });

    it("Should fail to create a user with duplicate email", async () => {
        const user = {
            username: "uniqueuser",
            password: "securepassword123",
            email: "duplicate@example.com",
            mobileNumber: "1234567890",
        };

        // Create the first user
        await request(app)
            .post("/api/users")
            .set("Content-Type", "application/json")
            .send(user);

        // Attempt to create another user with the same email
        const response = await request(app)
            .post("/api/users")
            .set("Content-Type", "application/json") //Ensure Correct Header
            .send(user);

        // Duplicate case assertions
        expect(response.status).toBe(400); // HTTP 400 Bad Request
        expect(response.body).toHaveProperty("error"); // Error object exists
        expect(response.body.error).toContain("email"); // Error mentions email duplication
    });
});


function expect(status: number) {
    throw new Error("Function not implemented.");
}

function beforeAll(arg0: () => Promise<void>) {
    throw new Error("Function not implemented.");
}

function afterAll(arg0: () => Promise<void>) {
    throw new Error("Function not implemented.");
}
/* Test for creating a new user
it("POST /api/users - should create a new user", async () => {
    const response = await request(app)
        .post("/api/users")
        .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.user).toHaveProperty("id");
    createdUserId = response.body.user.id;
});*/

/* Test for getting all users
it("GET /api/users - should fetch all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
});*/

/* Test for getting a single user
it("GET /api/users/:id - should fetch a user by ID", async () => {
    const response = await request(app).get(`/api/users/${createdUserId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", createdUserId);
    expect(response.body).toHaveProperty("username", testUser.username);
});*/

/* Test for updating a user
it("PUT /api/users/:id - should update a user", async () => {
    const updatedUser = {
        username: "updateduser",
        password: "newpassword123",
        email: "updateduser@example.com",
        mobileNumber: "0987654321",
    };

    const response = await request(app)
        .put(`/api/users/${createdUserId}`)
        .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User updated successfully");
    expect(response.body.user).toHaveProperty("username", updatedUser.username);
});*/

/* Test for deleting a user
it("DELETE /api/users/:id - should delete a user", async () => {
    const response = await request(app).delete(`/api/users/${createdUserId}`);

    expect(response.status).toBe(204);

    // Verify the user no longer exists
    const fetchResponse = await request(app).get(`/api/users/${createdUserId}`);
    expect(fetchResponse.status).toBe(404);
});*/


// import request from 'supertest';
// import { app } from '../../src/routes';
// import { Sequelize } from './sequelize';

// describe('User Routes', () => {
//     it('should create a new user', async () => {
//         const newUser = {
//             username: 'testUser',
//             password: 'testPassword',
//             email: 'test@example.com',
//             mobileNumber: '1234567890',
//         };
//         const res = await request(app).post('/users').send(newUser);
//         expect(res.statusCode).toBe(201);
//         // Add assertions for created user data
//     });

// });