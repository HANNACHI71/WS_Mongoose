// Require Mongoose and set up connection to MongoDB Atlas database URI stored in .env
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
  console.log('Connected to MongoDB database');
});

// Define Person schema with basic Mongoose schema types and required field
const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create Person model from the schema
const Person = mongoose.model('Person', PersonSchema);

// --- Create and Save a Record of a Model ---
function createAndSavePerson(name, age, favoriteFoods) {
  // Create a Person document instance
  const person = new Person({ name, age, favoriteFoods });

  // Save the person document to the database
  person.save((err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Person saved successfully:', data);
  });
}

// Example usage
const personData = {
  name: 'John Doe',
  age: 30,
  favoriteFoods: ['pizza', 'pasta'],
};
createAndSavePerson(personData.name, personData.age, personData.favoriteFoods);

// --- Create Many Records with model.create() ---
function createManyPeople(arrayOfPeople) {
  // Use Model.create() to create and save multiple people in one call
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('People created successfully:', data);
  });
}

// Example usage
const arrayOfPeople = [
  { name: 'Jane Doe', age: 25, favoriteFoods: ['sushi', 'burritos'] },
  { name: 'Mike Smith', age: 40, favoriteFoods: ['steak', 'pasta'] },
];
createManyPeople(arrayOfPeople);

// --- Use model.find() to Search Your Database ---
function findPeopleByName(name) {
  // Find all people with the given name
  Person.find({ name }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('People found with name', name, ':', data);
  });
}

// Example usage
const searchName = 'John Doe';
findPeopleByName(searchName);

// --- Use model.findOne() to Return a Single Matching Document ---
function findPersonByFavoriteFood(food) {
  // Find one person who has the specified food in their favorite foods list
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Person found with favorite food', food, ':', data);
  });
}

// Example usage
const favoriteFood = 'pizza';
findPersonByFavoriteFood(favoriteFood);

// --- Use model.findById() to Search Your Database By _id ---
function findPersonById(personId) {
  // Find the person with the specified _id
  Person.findById(personId, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Person found with ID', personId, ':', data);
  });
}

// Example usage (replace with actual person ID)
const personId = 'your_person_id_here';
findPersonById(personId);

// --- Perform Classic Updates by Running Find, Edit, then Save ---
function updatePersonAddFavoriteFood(personId, newFavoriteFood) {
  // Find the person by ID
  Person.findById(personId, (err, person) => {
    if (err) {
      console.error(err);
      return;
    }

    // Add the new favorite food to the person's list
    person.favoriteFoods.push
