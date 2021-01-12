import './carousel.css'
import {Link} from "react-router-dom";
const Carousel = (props) => {

    return(
        <div id="carouselExampleIndicators" className="carousel slide " data-ride="carousel">

            <ol className="carousel-indicators">
                {
                    props.posts.map((currElement, index) =>
                        <li
                            data-target="#carouselExampleIndicators"
                            data-slide-to={index}
                            className={index === 0 ? "active" : ''}
                            key={index}
                        >
                        </li>
                    )
                }
            </ol>

            <div className="carousel-inner">

                {
                    props.posts.slice(0).map((currElement, index) =>
                            <div className={index === 0 ? "carousel-item active": "carousel-item"} key={currElement._id}>
                                <Link to={`/commodity/${currElement._id}`}>

                                <img className="d-block w-100" src={currElement.imgSrc} alt={index + "'rd slide"} />
                                <div className="carousel-caption d-none d-md-block text-white bg-dark">
                                    <h5>{currElement.name}</h5>
                                    <p>
                                        {currElement.price}
                                        &nbsp;Toman
                                    </p>
                                </div>
                                </Link>

                            </div>
                    )
                }


            </div>

            <a className="carousel-control-prev bg-dark" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true">
                </span>
                <span className="sr-only">Previous</span>
            </a>

            <a className="carousel-control-next bg-dark" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon " aria-hidden="true">
                </span>
                <span className="sr-only">Next</span>
            </a>

        </div>


    );
}

export default Carousel;