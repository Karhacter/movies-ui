<template>
  <div>
    <div class="container">
      <div id="movies" class="row"></div>
    </div>
    <hr />

    <div class="box">
      <div class="text">
        <h1>Contact <span class="red">Us</span></h1>
        <div class="redline"></div>
        <p>Have Questions ? We have answers ( may be )</p>
      </div>
    </div>

    <div class="touch">
      <h2>Get in touch</h2>
      <div class="redline"></div>
    </div>
    <div class="container fill">
      <div class="forthis">
        <form
          action="https://formcarry.com/s/S1peCWurw0C"
          method="POST"
          name="contact-form"
          id="contact-form"
          onsubmit="return validateForm();"
        >
          <div class="form-row two2">
            <div class="form-group col-md-6 column">
              <input type="text" v-model="firstname" class="form-control input" placeholder=" " />
              <label for="firstname" class="">First Name</label>
              <div class="underline"></div>
            </div>
            <div class="form-group col-md-6 column">
              <input type="text" v-model="lastname" class="form-control input" placeholder=" " />
              <label for="lastname" class="">Last Name</label>
              <div class="underline"></div>
            </div>
          </div>

          <div class="form-row one1">
            <div class="form-group col-lg-6 column">
              <input type="text" v-model="email" class="form-control input" placeholder=" " />
              <label for="email" class="">Email</label>
              <div class="underline"></div>
            </div>

            <div class="form-group col-lg-6 column">
              <input type="text" v-model="phone" class="form-control input" placeholder=" " />
              <label for="number" class="">Phone Number</label>
              <div class="underline"></div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group column">
              <input type="text" v-model="subject" class="form-control input" placeholder=" " />
              <label for="subject" class="">Subject</label>
              <div class="underline extra"></div>
            </div>
          </div>

          <div class="form-row size">
            <div class="form-group column">
              <textarea
                v-model="message"
                class="form-control input"
                rows="5"
                placeholder=" "
              ></textarea>
              <label for="message" class="">Message</label>
              <div class="underline extra gap"></div>
            </div>
          </div>

          <div class="btn-sm">
            <input type="submit" value="SEND MESSAGE" class="sm-button" id="submit-btn" />
            <button type="reset" class="ms-1 sm-button" @click="clearFunc()">Reset</button>
          </div>
        </form>
      </div>
    </div>

    <!-- address -->

    <div class="container address">
      <div class="row add-row">
        <div class="col-sm-6">
          <h3>Our Address</h3>
          <div class="redline-address"></div>
          <p>13 B</p>
          <p>King Koti Road</p>
          <p>Vadodara,</p>
          <p>Gujrat - 500029</p>
          <div class="phone-e">
            <p><span class="glyphicon glyphicon-envelope"> </span> info@movie-website.com</p>
            <p><span class="glyphicon glyphicon-phone"></span> +91-97427 66666</p>
          </div>
        </div>
        <div class="col-sm-6 map-padd">
          <!-- -map- -->
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.019213593812!2d77.62060731482127!3d12.906485990898592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14eed2a26dbb%3A0x98f64960052a26b0!2sTrainingMug!5e0!3m2!1sen!2sin!4v1504259922701"
            width="100%"
            frameborder="0"
            style="border: 0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>

    <!-- offcanva JS and footer js -->
    <div class="bottom-gap"></div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  methods: {
    clearFunc() {
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.phone = ''
      this.subject = ''
      this.message = ''
    },
  },

  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    }
  },
}
</script>
