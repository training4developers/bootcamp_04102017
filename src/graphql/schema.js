import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID } from 'graphql';

export const catServant = new GraphQLObjectType({

    name: 'CatServant',
    fields: {
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
    },

});

export const catType = new GraphQLObjectType({

    name: 'Cat',
    description: 'A type for cute, furry, lovable mammals',
    fields: {
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
            resolve: ({ servant }) => {
                
                console.log('called servant resolve');
                
                return servant;
            }
        }
    }

});

const catServant1 = { id: 1, name: 'Jonathan' }; 
const catServant2 = { id: 2, name: 'Ashwin' }; 

const cats = [
    { hairColor: 'white', age: 7, livesLeft: 4, name: 'Garfield', servant: catServant1 },
    { hairColor: 'orange', age: 3, livesLeft: 7, name: 'Marvin', servant: catServant2 },
    { hairColor: 'black', age: 10, livesLeft: 1, name: 'Fluffy Meowington', servant: catServant1  },
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