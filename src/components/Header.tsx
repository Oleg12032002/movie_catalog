import { Link } from 'react-router-dom'

const Header = (props: {isMoviePage: boolean}) => {
    const {isMoviePage} = props;

    return (
        <div className="header">
            <div className="logo">
                {isMoviePage == false ? <img className="logo-img" src="https://pngimage.net/wp-content/uploads/2018/05/design-logo-png-1.png"></img>
                : <Link to="/"><img className="logo-img" src="https://cdn-icons-png.flaticon.com/512/190/190238.png"></img></Link>}
            </div>
            <div className="avatar">
                <img className="logo-avatar" src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/38484/38484.png"></img>
            </div>
        </div>
    )
}

export {Header}