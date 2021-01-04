import React from 'react';
import { Link } from 'react-router-dom';

class Posts extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
      <div className="row">
        {this.props.posts.map(index =>
          <div className="col-md-4"  key={index._id} >
            <div className="card m-2 p-2" style={{border: '1px solid #000'}}>
              <div className="row">
                <div className="col-sm-8">
                  <div className="card-body-left">

                    <h4 className="card-title">
                      {index.name}
                    </h4>

                    <p className="card-text">
                      <small className="text-muted">
                        قیمت :  {index.price} هزار تومان.
                      </small>
                    </p>
                  </div>
                </div>
                <div className="col-sm-4">
                  <img className="card-img card-img-top" src={index.imgSrc} alt={index.title}/>
                </div>
              </div>
            </div>
            <Link to={`/commodity/${index._id}`} className="stretched-link"></Link>
          </div>
      )}
      </div>

    )
  }
}

export default Posts;
