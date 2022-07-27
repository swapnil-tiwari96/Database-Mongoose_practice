import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "No name specified"]
    },
    // with data validation
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// Insert one
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Solid fruit"
})

// fruit.save();

// insert many one by one
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
})
const Person = mongoose.model("Person", personSchema);
const John = new Person({
    name: "John",
    age: 25
});
const Adam = new Person({
    name: "Adam",
    age: 35
});
const Charlie = new Person({
    name: "Charlie",
    age: 26,
    favouriteFruit: "Apple"
});

//Insert many at a time
Person.insertMany([Adam, Charlie], (err) =>
{
    if (err)
    {
        console.log(err);
    }
    else
    {
        console.log("Success");
    }
})

// Read operation
Person.find((err, persons) =>
{
    if (err)
    {
        console.log(err);
    }
    else
    {
        mongoose.connection.close();
        persons.forEach(((person) =>
        {
            console.log(person.name);
        }))
    }
})

// Update
Fruit.updateOne({ id: "62dff643d9ff4db0cee2c3ee" }, { name: "Darley" }, (err) =>
{
    if (err)
    {
        console.log(err)
    } else
    {
        console.log("Successfully updated");
    }
})

// Delete
Fruit.deleteOne({ name: "Peach" }, (err) =>
{
    if (err)
    {
        console.log(err);
    }
    else
    {
        log("Successfully deleted")
    }
})




