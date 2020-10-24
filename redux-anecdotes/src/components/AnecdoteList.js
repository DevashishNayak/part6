import React from 'react'
import { connect } from 'react-redux'
import { incrementVoteOf } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
        </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.incrementVoteOf(anecdote.id)
    props.notificationChange(`you voted '${anecdote.content}'`, 5)
  }

  return(
    <div>
        {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => vote(anecdote)}
            />
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.filter === '' ? state.anecdotes : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1)
  }
}

const mapDispatchToProps = {
  incrementVoteOf,
  notificationChange
}

const ConnectedAnecdote = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdote