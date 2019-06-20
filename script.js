const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event){
    event.preventDefault();

    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=bf56748d2cff719415419fb4faff50df&languge=ru&query='+ searchText;
    movie.innerHTML = 'Загрузка...';
    fetch(server)   
        .then(function(value){
            if(value.status != 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output){
        let inner = '';
        output.results.forEach(function (item){
            let nameItem = item.name || item.title;
            let dateItem =  '  ('+(item.first_air_date||item.release_date)+')';          
            let img_poster = item.poster_path ? urlPoster + item.poster_path : 'img/image_alt.png';

            inner += `
            <div class="col-12 col-md-4 col-xl-3 item" >
            <img src="${img_poster}" alt="${nameItem}">
               <h5>${nameItem+dateItem}</h5>
            </div>
            `;
        });
        movie.innerHTML = inner;
    })
    .catch(function(reason){
        movie.innerHTML = 'Упс, что-то пошло не так';
        console.log('error: '+ reason.status);
    });
}


searchForm.addEventListener('submit',apiSearch);

