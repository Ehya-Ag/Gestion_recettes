<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="background-container">
    <div class="container py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div class="card large-card text-center">
        <img
          src="https://media.gettyimages.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98="
          class="card-img-top large-image"
          alt="Notre restaurant"
        />
        <div class="card-body">
          <h2 class="card-title">Bienvenue au Restaurant Simplonien</h2>
          <p class="card-text">
            Découvrez une cuisine raffinée et authentique dans un cadre chaleureux et convivial.
            Notre chef met tout son savoir-faire au service de votre palais avec des recettes
            traditionnelles revisitées. Venez savourer nos plats préparés avec des ingrédients frais
            et de qualité.
          </p>
          <router-link to="/liste" class="btn btn-primary">Voir nos recettes</router-link>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <h3 class="text-center mb-4 text-primary">Nos Cuisiniers</h3>
      <div class="row justify-content-center">
        <div class="col-md-3 text-center">
          <div class="chef-card">
            <img
              src="https://media.istockphoto.com/id/877309720/fr/photo/chef-confiant-debout-bras-crois%C3%A9s-dans-cuisine.jpg?s=612x612&w=0&k=20&c=PVNOShGV8_sTTYs2qQgpflHL9vKlbGiVcqFdRINDybc="
              class="chef-img"
              alt="Chef Jean Dupont"
            />
            <h5 class="mt-3 text-warning">Jean Dupont</h5>
          </div>
        </div>
        <div class="col-md-3 text-center">
          <div class="chef-card">
            <img
              src="https://media.istockphoto.com/id/1298088270/fr/photo/jeune-beau-chef-de-femme-de-sourire-avec-des-bras-crois%C3%A9s-%C3%A0-la-cuisine.jpg?s=612x612&w=0&k=20&c=SPEkTdHm8FJh-deiMb4xrbxYi9zqI-wl3_YcfPcjIwQ="
              class="chef-img"
              alt="Chef Marie Curie"
            />
            <h5 class="mt-3 text-warning">Marie Curie</h5>
          </div>
        </div>
        <div class="col-md-3 text-center">
          <div class="chef-card">
            <img
              src="https://media.istockphoto.com/id/886640128/fr/photo/chef-permanent-%C3%A0-la-cuisine-du-restaurant.jpg?s=612x612&w=0&k=20&c=WOiLeA1BB2VcTV7d8xDenFyJfnfCO5G9RcuKXpK6KO0="
              class="chef-img"
              alt="Chef Pierre Legrand"
            />
            <h5 class="mt-3 text-warning">Pierre Legrand</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <h3 class="text-center mb-4 text-primary">Témoignages de nos Clients</h3>
      <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="d-flex justify-content-center">
              <div class="testimonial-card">
                <p class="text-secondary">
                  "Un service exceptionnel et des plats délicieux. Je reviendrai sans hésiter!"
                </p>
                <h6 class="mt-3 text-warning">- Clara B.</h6>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="d-flex justify-content-center">
              <div class="testimonial-card">
                <p class="text-secondary">
                  "Le meilleur restaurant en ville. L'ambiance est fantastique."
                </p>
                <h6 class="mt-3 text-warning">- Marc D.</h6>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="d-flex justify-content-center">
              <div class="testimonial-card">
                <p class="text-secondary">
                  "Une expérience culinaire inoubliable. Bravo à toute l'équipe!"
                </p>
                <h6 class="mt-3 text-warning">- Sophie L.</h6>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="container py-5">
      <h3 class="text-center mb-4 text-primary">Contactez-nous</h3>
      <form class="contact-form">
        <div class="mb-3">
          <label for="name" class="form-label">Nom</label>
          <input type="text" class="form-control" id="name" placeholder="Votre nom" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" placeholder="Votre email" />
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea
            class="form-control"
            id="message"
            rows="4"
            placeholder="Votre message"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Envoyer</button>
      </form>
    </div>
    <footer class="footer bg-primary text-white text-center py-3">
      <p>&copy; 2024 Restaurant Simplonien. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<style scoped>
.background-container {
  background-image: url('https://image.shutterstock.com/image-photo/blur-coffee-shop-cafe-restaurant-260nw-364151948.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f0f0f0;
}

.large-card {
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.large-card:hover {
  transform: translateY(-10px);
}

.large-image {
  height: 400px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.chef-card {
  display: inline-block;
}

.chef-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border: 5px solid #ffff04;
}

.testimonial-card {
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-left: 5px solid #007bff;
}

.text-primary {
  color: #007bff !important;
}

.text-warning {
  color: #030303 !important;
}

.contact-form .form-control {
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.contact-form button[type='submit'] {
  background-color: #007bff;
  border-color: #007bff;
}

.contact-form button[type='submit']:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.footer {
  background-color: #007bff;
  padding: 15px;
  color: #fff;
  text-align: center;
}
</style>
