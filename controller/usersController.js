const dotenv = require("dotenv");
dotenv.config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
    PutCommand,
    ScanCommand,
    UpdateCommand
} = require("@aws-sdk/lib-dynamodb");

const docClient = new DynamoDBClient({ regions: process.env.AWS_REGION });

exports.getItems = async (req, res) => {
    const params = {
        TableName: process.env.aws_users_table_name,
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
    const created_date = Date.now();
    const item = { ...req.body, created_date: created_date };
    const params = {
        TableName: process.env.aws_users_table_name,
        Item: item
    }
    try {
        const data = await docClient.send(new PutCommand(params));
        res.send(data.Items)
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

exports.updateItemid = async (req, res) => {
    const userid = req.params.userid;
    const itemids = req.body.itemids
    const params = {
        TableName: process.env.aws_users_table_name,
        Key: {
            userid: userid
        },
        UpdateExpression: 'set #itemids = :l',
        ExpressionAttributeNames: { '#itemids': 'itemids' },
        ExpressionAttributeValues: { ':l': itemids }
    }
    try {
        const data = await docClient.send(new UpdateCommand(params));
        res.send(data.Items)
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

