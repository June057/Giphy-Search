import React from 'react';
import './App.css';
const API_KEY='tDEu7mkHyfgE39B8FEVOdBRdQIXqtBlB';
const ID='e826c9fc5c929e0d6c6d423841a282aa;'


class App extends React.Component {
    constructor() {
        super();
        this.state={
            searchValue:'',
            giphyData:[]
        }

    }
    fetchGiphy=(e)=>{
        this.setState({
            searchValue:e.target.value
        })
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${e.target.value}&random_id=${ID}&lang=en&limit=${50}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        giphyData: result
                    });
                },
                 (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    copyToClipboard =(text)=> {
        const textVal = document.createElement("textarea");
         document.body.appendChild(textVal);
        textVal.value = text;
        textVal.select();
        document.execCommand("copy");
        document.body.removeChild(textVal);
    }


    render() {
    const {searchValue,giphyData}=this.state;
    return (
        <div className="App">
            <p className={'header'}>Search Giphy</p>
            <input
                className={'inputClass'}
                value={searchValue}
                onChange={(e) => this.fetchGiphy(e)}
                placeholder={'Search Giphy'}
            />
            <div className={'result'}>
                {giphyData?.data?.map((data)=>{
                    return(
                        <p >{data.title}
                        <a className={'action'} onClick={()=>this.copyToClipboard(data.url)}>Copy url</a>
                        <a className={'action'} onClick={()=>window.open(data.url)}>Redirect to giphy</a>
                        </p>
                    )
                })}

            </div>
        </div>
    );
}
}

export default App;
