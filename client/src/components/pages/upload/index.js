import React, {Component} from 'react';
import './index.css';
import axios from 'axios';

class Upload extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            price: 0,
            about: '',
            file : null,
            imgSrc: ''
        }
        this.nameChange     = this.nameChange.bind(this);
        this.priceChange    = this.priceChange.bind(this);
        this.aboutChange    = this.aboutChange.bind(this);

        this.inputFileChange    = this.inputFileChange.bind(this);

    }

    nameChange = (e) => {
        this.setState({name: e.target.value});
    }
    priceChange = (e) => {
        this.setState({price: e.target.value});
    }
    aboutChange = (e) => {
        this.setState({about: e.target.value});
    }



    formSubmit(e){
        e.preventDefault();

        const data = new FormData()
        data.append('file', this.state.file)

        data.append('name', this.state.name);
        data.append('price', this.state.price);
        data.append('about', this.state.about);

        axios.post(" http://127.0.0.1:3001/upload", data, {
            // receive two parameter endpoint url ,form data
        })
            .then(res  => {console.log("OK ", res)})
            .catch(err => {console.log("Err", err)});
    }


    inputFileChange(e){
        if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(e.target.files[0].name)) {

            let a = window.URL.createObjectURL(e.target.files[0]);
            this.setState({imgSrc: a});

            this.setState({file: e.target.files[0]})
        }else {
            e.target.value = "";
            console.log("not img");
        }
    }

    render () {
        return (
            <div className='container bg-light upload'>
                <form onSubmit={(e) => this.formSubmit(e)} encType="multipart/form-data">

                    <div className="form-label-group text-right">
                        <label htmlFor="inputEmail">نام محصول </label>
                        <input type="text" id="name" className="form-control text-right" placeholder="Name"
                               value={this.state.name} onChange={this.nameChange} required autoFocus />
                    </div>

                    <div className="form-label-group text-right">
                        <label htmlFor="inputEmail">قیمت محصول </label>
                        <input type="number" id="price" className="form-control text-right" placeholder="Price"
                               value={this.state.price} onChange={this.priceChange} required />
                    </div>

                    <div className="form-label-group text-right">
                        <label htmlFor="inputEmail">توضیحات درمورد محصول </label>
                        <textarea className="form-control text-right" id="About" placeholder={"About"}
                                  value={this.state.about} onChange={this.aboutChange} required> </textarea>
                    </div>

                    <br />
                    <div>
                        <h3>
                            {this.state.checkMessage}
                        </h3>
                    </div>
                    <hr />
                    <div className="form-group" align="center">

                        <div>
                            <input type={'file'} accept="image/x-png,image/gif,image/jpeg" onChange={e => this.inputFileChange(e)} multiple/>

                            <img src={this.state.imgSrc} className="imgw rounded mx-auto d-block img-thumbnail" alt={`imageForInput`} />
                        </div>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                        بارگذاری<i className="fas fa-upload"> </i>
                    </button>
                </form>
                <br />
            </div>
        );
    }
}

export default Upload;
