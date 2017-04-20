import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID } from 'graphql';

export const catServant = new GraphQLObjectType({

    name: 'CatServant',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        cats: {
            type: new GraphQLList(catType),
            resolve: ({ catIds }) => cats.filter(cat => catIds.includes(cat.id)), 
        }
    }),

});

export const catType = new GraphQLObjectType({

    name: 'Cat',
    description: 'A type for cute, furry, lovable mammals',
    fields: () => ({
        hairColor: {
            type: GraphQLString,
            description: 'The color of the cat hair',
        },
        age: {
            type: GraphQLInt,
            description: 'The number of times the cat has circled the sun',
        },
        livesLeft: {
            type: GraphQLInt,
            description: 'How long until the cat expires',
        },
        servant: {
            type: catServant,
            resolve: ({ servantId }) => servants.find(servant => servant.id === servantId),
        }
    })

});

const servants = [
    { id: 1, name: 'Jonathan', catIds: [1,3] },
    { id: 2, name: 'Ashwin', catIds: [2] },
];

const cats = [
    { id: 1, hairColor: 'white', age: 7, livesLeft: 4, name: 'Garfield', servantId: 1 },
    { id: 2, hairColor: 'orange', age: 3, livesLeft: 7, name: 'Marvin', servantId: 2 },
    { id: 3, hairColor: 'black', age: 10, livesLeft: 1, name: 'Fluffy Meowington', servantId: 1  },
];

export const schema = new GraphQLSchema({

    query: new GraphQLObjectType({

        name: 'Query',
        description: 'Top-Level Query',
        fields: {
            message: {
                type: GraphQLString,
                description: 'A nice message for you',
                resolve: () => 'Keep Smiling!',
            },
            cats: {
                type: new GraphQLList(catType),
                description: 'A list of kitties',
                resolve: () => cats,
            }
        },

    }),

});