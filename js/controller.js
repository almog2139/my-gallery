console.log('Starting up');
jQuery(function () {
    init()

});

function init() {
    renderProject();
}

function renderProject() {
    var projects = getProjectForDisplay();
    console.log(projects);
    var strHtmls = projects.map(function (proj) {
        return `
      <div  onclick="onShowModal('${proj.id}')" class="col-md-4 col-sm-6 portfolio-item">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>
        <img class="img-fluid" src="img/${proj.name}.jpg" alt="">
      </a>
      <div class="portfolio-caption">
        <h4>${proj.name}</h4>
        <p class="text-muted">${proj.title}</p>
      </div>
    </div>
        `

    })
    var elModal = document.querySelector('.row-main');
    elModal.innerHTML = strHtmls.join(' ');
}
function onShowModal(projId) {
    var proj = findProj(projId)
    var strHtml = 
     `
    <h2>${proj.name}</h2>
    <p class="item-intro text-muted">${proj.title}.</p>
    <img class="img-fluid d-block mx-auto" src="img/${proj.name}.jpg" alt="">
    <p>${proj.desc}!</p>
    <ul class="list-inline">
      <li>Date: <span>${proj.date}</span></li>
      <li class="url"><a href=${proj.url}/>url</li>
      <li class="label-details">${proj.label}</li>
    
    </ul>
    <button onclick="onCloseModal()"class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project
    </button>
        `

        $('.modal-body').html(strHtml)
    // var elModalBody = document.querySelector('.modal-body');
    // elModalBody.innerHTML = strHtml;
    // ('.modal-conteinar').show()

}
function onCloseModal() {
    $('.modal-conteinar').hide()
}