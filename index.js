import express from "express";
import mongodb from "mongodb"

const mongoClient = new mongodb.MongoClient('mongodb://localhost:27017');
mongoClient.connect()

const PORT = 4649;

const app = express()
app.use(express.json())
