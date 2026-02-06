import mongoose from "mongoose";
import { Sequelize, DataTypes } from "sequelize";
import _ from 'lodash';
import casual from 'casual';

async function connectMongo() {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect('mongodb://localhost/widgets');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

async function syncAndSeedCategories() {
    console.log('Syncing SQLite DB and seeding Categories table...');
    try {
        await sequelize.sync( { force: true });
        console.log('SQLite connectection established and Categories model synced\nadd random categories...');
        
        // Seed categories
        await Promise.all(_.times(5, () => {
            return Categories.create({
                category: casual.word,
                description: casual.sentence,
            });
        }));
        console.log('Categories seeded');
    } catch (error) {
        console.log('Error with SQLite DB:', error);
    }
}

const widgetSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    soldout: String,
    inventory: String,
    stores: Array,
});

const Widgets = mongoose.model('widgets', widgetSchema);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
});

const Categories = sequelize.define('categories', {
    category: DataTypes.STRING,
    description: DataTypes.STRING,
});

connectMongo();
syncAndSeedCategories();

export { Widgets, Categories };
