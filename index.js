const categoryHandleClick = async () => {
    const response = await fetch ("https://openapi.programming-hero.com/api/news/categories")
    const categoryData = await response.json();
    // console.log(categoryData);
    // console.log(categoryData.data);

    const cutData = categoryData.data.news_category.slice(0, 8);
    const tabsContainer = document.getElementById('category-tabs')
    cutData.forEach((categoryElement) => {
        const tabDiv = document.createElement('div');
        tabDiv.innerHTML = `
        <a onclick="categoryLoadNews('${categoryElement.category_id}')" class="tab">${categoryElement.category_name}</a> 
        `;

        tabsContainer.appendChild(tabDiv);
    });
};


const categoryLoadNews = async (categoryId) => {
    // console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    // console.log(data.data);

    const newsContainer = document.getElementById('mews-card-container');
    newsContainer.innerHTML = "";
data.data?.forEach((news) =>{
    const newsCard = document.createElement('div');
    newsCard.innerHTML = `
    <div class="card bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                  <img src="${news?.image_url}" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-left">
                  <h2 class="card-title">${news?.title?.slice(0, 70)}</h2>
                  <div class="badge badge-secondary p-5 rounded-xl font-semibold">
                  ${news?.rating?.badge}
                  </div>
                  <p>${news?.details?.slice(0, 50)}</p>
                  <p class="text-2xl font-medium">Total Views: ${news.total_view ? news.total_view : "No Views"}</p>
                  <div class="flex justify-between items-center">
                  <div class="flex justify-center items-center gap-2">
                      <div class="flex justify-between">
                          <img class="w-14 rounded-full" src="${news?.author?.img}" alt="">
                      </div>
                      <div>
                          <h1 class="text-3xl font-semibold">${news?.author?.name.slice(0, 5) || 'Unavailable'}</h1>
                          <p>${news?.author?.published_date}</p>
                  </div>
                  </div>
                  <div>
                      <button onclick="newsModal('${news._id}')" class="btn btn-neutral rounded-xl">Details</button>
                  </div>
              </div>
                </div>
              </div>
    `;
    newsContainer.appendChild(newsCard);
})
}

const newsModal = async (newsId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await response.json();
    console.log(data.data[0]);
    const modalContainer = document.getElementById('news-modal');
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
    <dialog id="my_modal_4" class="modal">
  <form method="dialog" class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Click the button below to close</p>
    <div class="modal-action">
      <!-- if there is a button, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
    `;
    modalContainer.appendChild(modalDiv);

    const modal = document.getElementById('my_modal_4');
    modal.showModal();
}


categoryHandleClick();
categoryLoadNews("01");
