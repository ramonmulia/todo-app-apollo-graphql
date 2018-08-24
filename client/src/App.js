import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

const ADD_TASK = gql`
mutation createTask($task: TaskInput) {
  createTask(task: $task) {
    name
  }
}
`;

const GET_TASKS = gql`
{
  Tasks {
    name
    date
  }
}
`;

const AddTask = () => {
  let input;

  return (
    <Mutation mutation={ADD_TASK}
      refetchQueries={[{ query: GET_TASKS }]}
    >
      {(addTask, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addTask({ variables: { task: { name: input.value } } });
              input.value = "";
            }}
          >
            <input ref={node => input = node} />
            <button type="submit">Add Task</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

const ListTasks = () => (
  <Query
    query={GET_TASKS}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <ul>
        {
          data.Tasks.map(({ name, date }, index) => (
            <li key={index}>
              {name} - {date}
            </li>
          ))
        }
      </ul>
    }}
  </Query>
)

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div
          style={{
            margin: '0 auto',
            width: 500,
            marginTop: 50,
            border: '1px solid black',
            padding: 28,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <AddTask />
          <ListTasks />
        </div>
      </ApolloProvider >
    );
  }
}

export default App;
