import axios from 'axios';
export default class API {
    constructor(){
        this.search = '';
        this.page = 1;
    }

    async fetchPicture() {
       const KEY = '28748446-fce243148b02f921fb9eb39df';
       const url =`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.page}&per_page=12&key=${KEY}`;
        const req = await axios(url)
        return req.data
    }

    incrementPage(){
        this.page += 1
      }

    resetPage(){
        this.page = 1;
      }

    onChangeSearch(value){
      this.search = value;
    }
}