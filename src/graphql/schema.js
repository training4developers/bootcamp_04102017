import {
    GraphQLSchema, GraphQLObjectType, GraphQLString,
    GraphQLInt, GraphQLID, GraphQLInterfaceType, GraphQLInputObjectType,
} from 'graphql';

const people = [
    { id: 1, firstName: 'Bob', lastName: 'Smith' },
    { id: 2, firstName: 'John', lastName: 'Thomas' },
    { id: 3, firstName: 'Irene', lastName: 'Simmons' },
];

const entityInterface = new GraphQLInterfaceType({

    name: 'Entity',
    description: 'An entity interface',
    resolveType: (data, context, query) => {
        // take data and determine type
        return personType;
    }, 
    fields: () => ({
        id: { type: GraphQLID },
    })
});

const personType = new GraphQLObjectType({

    name: 'Person',
    description: 'A person',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id of the user'
        },
        firstName: {
            type: GraphQLString,
            description: 'The first name of the person',
            // param1: object passed from parent resolve
            resolve: ({ firstName }) => firstName,
        },
        lastName: {
            type: GraphQLString,
            description: 'The last name of the person',
        },
    },
    interfaces: () => ([ entityInterface ]),
});


export const personInputType = new GraphQLInputObjectType({
    
    name: 'InputPerson',
    description: 'Person input type',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
    }),

});


export const schema = new GraphQLSchema({

    mutation: new GraphQLObjectType({

        name: 'Mutation',
        description: 'The mutation type',
        fields: () => ({
            insertPerson: {
                type: personType,
                description: 'insert a person',
                args: {
                    person: { type: personInputType },
                },
                resolve: (_, { person }) => {
                    person.id = people.length + 1;
                    people.push(person);
                    return person;
                }
            }
        }),
    }),

    query: new GraphQLObjectType({

        name: 'Query',
        description: 'Our query type',
        fields: {

            message : {
                type: GraphQLString,
                description: 'a simple message',
                resolve: () => 'here is the message!',
            },

            person: {
                type: personType,
                description: 'a single person',
                args: {
                    id: {
                        type: GraphQLInt,
                        description: 'The id of the person to query',
                    }
                },
                // param2: args
                resolve: (_, { id }) => people.find(p => p.id === id),
            },

            entity: {
                type: entityInterface,
                description: 'a entity',
                args: {
                    id: {
                        type: GraphQLInt,
                        description: 'The id of the entity'
                    }
                },
                resolve: (_, { id }) => people.find(p => p.id === id),
            }
        },
    }),
});