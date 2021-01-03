import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({ addLike, 
  removeLike, 
  deletePost, 
  auth, 
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions}) => {
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             {/* <p className="post-date">
                Posted on {formatDate(date)}
            </p> */}

            {/* Show action buttons if PostItem is not viewed specifically */}
            {showActions && <Fragment>
              <button type="button" onClick={e => addLike(_id)} className="btn btn-light">
              <i className="fas fa-thumbs-up">{' '}</i>
              <span>{ likes.length > 0 && (
                <span>{likes.length}</span>
              )}</span>
            </button>
            <button type="button" onClick={e => removeLike(_id)} className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion {' '}
              {/* Show comments when comments array is more than 1 */}
              { comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {/* Only show delete button when post owner == current user */}
            {!auth.loading && user === auth.user._id && (
                <button
                onClick={e => deletePost(_id)}      
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
              </Fragment>}
            
          </div>
          </div>

    )
}

// Set showActions default value to be true
PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps, { addLike, removeLike, deletePost }
)(PostItem)
