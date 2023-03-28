import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext.js';
import styles from './CommentPartial.module.css';

export const CommentPartial = ({ comment }) => {
    const { isAdmin } = useContext(AuthContext);
    const commentHideHandler = (e) => {
        e.target.parentElement.parentElement.style.display = "none"
    }
    const getRatingContent = rating => {
        let content = [];
        for (let i = 0; i < rating; i++) {
            content.push(<i key={i} className={`fa fa-star ${styles.star}`}></i>);
        }
        return content;
    };
    return (
        <div className="card col-md-6 offset-md-3">
            <div className="card-header row row-cols-lg-auto">
                <div className="ratings col-12">
                    <div className="stars">
                        {getRatingContent(comment?.rating)}
                    </div>
                </div>
                {isAdmin &&
            <button onClick={(e) => commentHideHandler(e)} className={styles['x-comments']}>X</button>
       } 
            </div>
            <div className="card-body">

                <p className="blockquote">
                    {comment.comment}
                </p>
                <figcaption className="blockquote-footer">
                    by {comment.userEmail}

                </figcaption>
            </div>
        </div>
    );
}