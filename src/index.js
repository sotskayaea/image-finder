import './sass/main.scss';
// import bootstrap from 'bootstrap'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import API from './js/apiService.js';
import renderGallery from './templates/gallery.hbs';


const refs = {
    form : document.querySelector('.search-form'),
    input: document.querySelector('.input'),
    gallery : document.querySelector('.gallery'),
    searchButton: document.querySelector('.search-button'),
}

const api = new API;

refs.form.addEventListener('submit', onSearchPicture);

function onSearchPicture(e){
    e.preventDefault()
    const value = refs.form.elements.query.value;
    api.onChangeSearch(value);
    onRenderGallery()

    if(value){
        onClearMarkup() 
    }
   
}

async function onRenderGallery(){
    const pictures = await api.fetchPicture();
    const gallery = renderGallery(pictures);

    refs.gallery.insertAdjacentHTML('beforeend', gallery);
    refs.input.value = '';

    if(pictures.hits.length === 12){
        const lastChild = refs.gallery.lastElementChild;
        const loadingObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => { 
              if (entry.isIntersecting) { 
                onLoadMorePictures();
              }
            })
          });

          loadingObserver.observe(lastChild) 
    }

    if (pictures.hits.length !== 0 ){
        const galleryModalWindow = new SimpleLightbox('.gallery a', {
            captionPosition: 'bottom',
            captionDelay: 250,
          });
    }  

}

function onLoadMorePictures(){
    api.incrementPage();
    onRenderGallery();

}

function onClearMarkup(){
    refs.gallery.innerHTML = ''
    api.resetPage();
}


