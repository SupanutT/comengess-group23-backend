const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  PutCommand,
  DeleteCommand,
  ScanCommand,
  UpdateCommand
} = require("@aws-sdk/lib-dynamodb");

const docClient = new DynamoDBClient({ regions: process.env.AWS_REGION });


exports.getItems = async (req, res) => {
  // You should change the response below.
  const params = {
    TableName: process.env.aws_items_table_name,
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
  const item_id = uuidv4();
  const created_date = Date.now();
  const item = { item_id: item_id, ...req.body, created_date: created_date };
  const params = {
    TableName: process.env.aws_items_table_name,
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

exports.deleteItem = async (req, res) => {
  const item_id = req.params.item_id;

  const params = {
    TableName: process.env.aws_items_table_name,
    Key: {
      item_id: item_id
    }
  }
  try {
    const data = await docClient.send(new DeleteCommand(params));
    res.send(data.Items)
  } catch(err){
    console.error(err);
    res.status(500).send(err);
  }
}

exports.updateItemStatus = async (req, res) => {
  const item_id = req.params.item_id;
  const status = req.body.status
  const params = {
    TableName: process.env.aws_items_table_name,
    Key: {
      item_id: item_id
    },
    UpdateExpression: 'set #status = :s',
    ExpressionAttributeNames: { '#status' : 'status' },
    ExpressionAttributeValues: { ':s' : status}
  }
  try {
    const data = await docClient.send(new UpdateCommand(params));
    res.send(data.Items)
  } catch(err){
    console.error(err);
    res.status(500).send(err);
  }
}
