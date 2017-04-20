import {
    GraphQLSchema, GraphQLObjectType, GraphQLString,
    GraphQLInt, GraphQLList, GraphQLID, GraphQLInterfaceType } from 'graphql';

class Servant {
    constructor(data) {
        Object.assign(this, data);
    }
}

class Cat {
    constructor(data) {
        Object.assign(this, data);
    }
}

export const nodeInterface = new GraphQLInterfaceType({

    name: 'Node',
    description: 'Node Interface for all Objects',
    resolveType: (node) => {
        if (node instanceof Servant) {
            return catServant;
        } else {
            return catType;
        }
    },
    fields: () => ({
        id: {
            type: GraphQLID,
        }
    })

});


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
    interfaces: () => ([ nodeInterface ]),

});

export const catType = new GraphQLObjectType({

    name: 'Cat',
    description: 'A type for cute, furry, lovable mammals',
    fields: () => ({
        id: { type: GraphQLID, },
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
    }),
    interfaces: () => ([ nodeInterface ]),

});

const servants = [
    new Servant({ id: 1, name: 'Jonathan', catIds: [1,3] }),
    new Servant({ id: 2, name: 'Ashwin', catIds: [2] }),
];

const cats = [
    new Cat({ id: 1, hairColor: 'white', age: 7, livesLeft: 4, name: 'Garfield', servantId: 1 }),
    new Cat({ id: 2, hairColor: 'orange', age: 3, livesLeft: 7, name: 'Marvin', servantId: 2 }),
    new Cat({ id: 3, hairColor: 'black', age: 10, livesLeft: 1, name: 'Fluffy Meowington', servantId: 1  }),
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
            },
            cat: {
                type: catType,
                description: 'A single kitty',
                args: { 
                    catId: {
                        type: GraphQLID,
                    }
                },
                resolve: (_, { catId }) => cats.find(cat => cat.id === parseInt(catId)),
            },
            node: {
                type: nodeInterface,
                args: {
                    id: { type: GraphQLID },
                },
                resolve: (_, { id }) => {

                    const [ type, objId] = id.split(':');

                    if (type === 'Cat') {
                        return cats.find(cat => Number(objId) === cat.id);
                    } else {
                        return servants.find(servant => Number(objId) === servant.id);
                    }

                }
            }
        },

    }),

});