<template>
  <div>
    <div class="buddy">
      <div class="slider">
        <div class="slide_track">
          <div class="slide">
            <img src="./img/apharan.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="maincontainer">
      <h2>Movies</h2>
      <hr />
      <div class="container">
        <div id="movies" class="row"></div>
      </div>
      <div class="container" id="Movies">
        <h3>Hollywood</h3>
        <hr />
        <div class="poster">
          <div class="flip-card_i">
            <div class="flip-card-inner_i">
              <div class="flip-card-front_i"></div>
              <div class="flip-card-back_i">
                <h1>Inception</h1>
                <button class="btn_i b3_i" title="Year" style="color: white">2010</button>
                <button class="btn_i b2_i" title="Minutes" style="color: white">2h42m</button>
                <button class="btn_i b1_i" title="IMDb" style="color: white">8.8</button>
                <br />
                <br />

                <p class="para_i">
                  Cobb steals information from his targets by entering their dreams. Saito offers to
                  wipe clean Cobb's criminal history as payment for performing an inception on his
                  sick competitor's son.
                </p>

                <!--<form action="https://youtu.be/YoHD9XEInc0&t=17s"> -->

                <button class="trailer_i" type="submit" value="" onclick="openWin()">
                  ▶Trailer
                </button>
                <!-- </form> -->
                <br />
                <br />
                <button class="btn_i b4_i" onclick="openMovieWin()">▶Play</button>
              </div>
            </div>
            <div class="flim"><b>Inception</b><br />IMDb - 8.8</div>
          </div>
        </div>
      </div>

      <h2>Kids</h2>
      <hr />
      <div class="container" id="Kids">
        <div class="poster">
          <div class="flip-card_i">
            <div class="flip-card-inner_i">
              <div class="flip-card-front_i">
                <img src="./Images/bat.jpg" alt="Avatar" style="width: 250px; height: 360px" />
              </div>
              <div class="flip-card-back_i">
                <h1>The Dark Knight Rises</h1>
                <button class="btn_i b3_i" title="Year" style="color: white">2012</button>
                <button class="btn_i b2_i" title="Minutes" style="color: white">2h44m</button>
                <button class="btn_i b1_i" title="IMDb" style="color: white">8.4</button>

                <br />
                <br />

                <p class="para_i">
                  Bane, an imposing terrorist, attacks Gotham City and disrupts its eight-year-long
                  period of peace.
                </p>

                <button class="trailer_i" type="submit" value="" onclick="openWin54()">
                  ▶Trailer
                </button>

                <br /><br />
                <button class="btn_i b4_i">▶Play</button>
              </div>
            </div>
            <div class="flim">
              <b>The Dark Knight Rises</b>
              <br />
              IMDb - 8.4
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
