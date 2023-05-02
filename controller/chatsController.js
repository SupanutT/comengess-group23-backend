const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  PutCommand,
  ScanCommand
} = require("@aws-sdk/lib-dynamodb");

const docClient = new DynamoDBClient({ regions: process.env.AWS_REGION });


exports.getItems = async (req, res) => {
  const params = {
    TableName: process.env.aws_chats_table_name,
  };
  try {
    const data = await docClient.send(new ScanCommand(params));
    res.send(data.Items);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.postItems = async (req, res) => {
    const chat_id = uuidv4();
    const created_date = Date.now();
    const item = { chat_id: chat_id, ...req.body, created_date: created_date };
    const params = {
      TableName: process.env.aws_chats_table_name,
      Item: item
    }
    try{
      const data = await docClient.send(new PutCommand(params));
      res.send(data.Items)
    } catch(err){
    console.error(err);
    res.status(500).send(err);
    }
  };