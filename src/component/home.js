import React from 'react';
import s from "./style.css";


export default class Hot extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        error: null,
        list: []
      };
    }


    fetchFirst(){
      fetch("./table.json")
      .then(res => res.json())
      .then((res) => {
        this.setState({
          list: res.items
        });
       })
     .catch(error => {
       this.setState({ error });
     });
    }


    componentWillMount() {
      this.fetchFirst();
    }

    render(){
        return (<div>
            <Filter items={this.state.list} />
          </div>);
    }
}




class Filter extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          filtered: []
      };

      this.nameInput = this.nameInput.bind(this);
      this.genreInput = this.genreInput.bind(this);
      this.premierInput = this.premierInput.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.items
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
  }


  nameInput(e) {

    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {

      currentList = this.props.items;

      newList = currentList.filter(item => {

        const lc = item.title.toLowerCase();

        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });

    } else {
        newList = this.props.items;
    }

    this.setState({
      filtered: newList
    });
  }


  genreInput(e) {

    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {

      currentList = this.props.items;

      newList = currentList.filter(item => {

        const lc = item.genre.toLowerCase();

        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });

    } else {
        newList = this.props.items;
    }

    this.setState({
      filtered: newList
    });
  }


  premierInput(e) {

    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {

      currentList = this.props.items;

      newList = currentList.filter(item => {

        const lc = item.premiere.toLowerCase();

        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });

    } else {
        newList = this.props.items;
    }

    this.setState({
      filtered: newList
    });
  }


onSort(event, sortKey){
    const data = this.state.filtered;
    data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
    this.setState({data});
  }

onSortPrem(event, sortKey){
    const data = this.state.filtered;
    data.sort((a,b) => new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime());
    this.setState({data});
}

press(e) {
  let target = e.currentTarget;

  if (target.lastChild.style.display !== 'block') {
    target.lastChild.style.display = 'block';
  } else {
    target.lastChild.style.display = 'none';
  }

}

    render() {
        return   (<div className={s.main}>
          <div className={s.top}>
              <input placeholder="Name" onChange={this.nameInput}></input>
              <input placeholder="Genre" onChange={this.genreInput}></input>
              <input placeholder="Premiere Year" onChange={this.premierInput}></input>
          </div>
          <div className={s.head}>
            <div onClick={(e) => this.onSort(e, 'title')}>Name </div>
            <div onClick={(e) => this.onSort(e, 'season')}>Season</div>
            <div onClick={(e) => this.onSort(e, 'network')}>Network</div>
            <div onClick={(e) => this.onSortPrem(e, 'premiere')}>Premiere</div>
          </div>
          {this.state.filtered.map((item, i) =>
               <div key={i} onClick={(e) => this.press(e)}>
                 <div className={s.body} >
                   <div>
                     {item.title}
                     <p>
                       {item.genre}
                     </p>
                   </div>
                   <div>
                     {item.season}
                   </div>
                   <div>
                     {item.network}
                   </div>
                   <div>
                     {item.premiere}
                   </div>
                 </div>

                 <div className={s.descript}>
                   <p>
                     {item.textdesc}
                   </p>
                 </div>
             </div>
            )}
        </div>);
    }
}
