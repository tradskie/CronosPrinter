<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Cronos TokenPrinter</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/CRO.png" rel="icon" type="image/jpg">
  <link href="assets/img/CRO.png" rel="apple-touch-icon">

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://cronos.tokenprinters.online/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Cronos TokenPrinter" />
  <meta property="og:description"content="Project made by the TokenPrinters Dev Team" />
  <meta property="og:image" content="https://cronos.tokenprinters.online/assets/img/CRO2.png" />
  
  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="https://t.me/TokenPrintersTeam" />
  <meta property="twitter:url" content="https://cronos.tokenprinters.online/" />
  <meta name="twitter:title" content="Cronos TokenPrinter" />
  <meta name="twitter:description" content="Project made by the TokenPrinters Dev Team" />
  <meta name="twitter:image" content="https://cronos.tokenprinters.online/assets/img/CRO2.png" />

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Libre+Franklin:wght@200&display=swap" rel="stylesheet">
  
  <!-- Vendor CSS Files -->
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/web3/3.0.0-rc.5/web3.min.js"></script>
  <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top ">
    <div class="container d-flex align-items-center justify-content-lg-between">
      <h1 class="logo me-auto me-lg-0"><a href="index.html"><img style="height: 100%; width: 40px; padding-right: 5px;" src="assets/img/CRO.png" alt="">Cronos Space Miner.</a></img></h1>
      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
           <!--<li><a class="btn connect-btn" href="https://ada.tokenprinters.online/?ref=0x7ec5c8753ed76a517a5c48de14f489f334b33ed2" target="_blank">Check AdaPrinter!</a></li> -->	          
	         <li> 
            <a class="nav-link" href="https://app.cronaswap.org/swap" target="_blank"><img class="nav-logo" id="logo" alt="" src=""></img>Buy $CRO</a>
          </li>
	         <li>
	           <a class="nav-link scrollto" href="#faq">FAQs</a>
	        </li> 
           <li>
	           <a class="nav-link" href="https://cronoscan.com/address/0x625043b774fd8b687d21b5d0408d64744e742557" target="_blank"><img class="nav-logo" id="logo" alt="" src="assets/img/bscscan-logo-light-circle.svg"></img>Contract</a>
          </li>
           <li>
            <a class="nav-link" href="https://t.me/TokenPrintersTeam" target="_blank"><img class="nav-logo" id="telegram" alt="" src="assets/img/telegram.svg"></img>Telegram</a>
          </li>
          <li>
            <a class="nav-link" >
              <button id="enableMetamask" class="btn connect-btn">Connect</button>
            </a>
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->
    </div>
  </header><!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="bg d-flex align-items-center justify-content-center">
    <div class="container">
      <!-- <div class="row" style="justify-content: center; margin-bottom: 30px;">
        <div class="big-timer" id="start-container">
          Starts in <strong id="start-timer">00:00:00</strong>
        </div>
      </div> -->
      <div class="content-box" data-aos="zoom-in" style="border-style: solid;border-width: 1px;border-radius: 15px;padding: 20px;">
        <div class="row">
          <div class="col-lg-6">
            <h3><span class="busd" style="text-shadow: 2px 2px 5px rgb(255, 255, 255); color: black">Cronos Space Miner</span></h3>
            <h2>A smart and sustainable way to grow your<span class="busd"> CRO </span></h2>
            <h4> 
              <i class="bi-check2-square bnb-icon"></i>
              <span id="daily-rate">0% Daily ~ 0% APR</span>
            </h4>
            <h4>
              <i class="bi-check2-square bnb-icon"></i>
              <span id="daily-compound">0% Stacking Compound Bonus</span>
            </h4>
            <h4>
              <i class="bi-check2-square bnb-icon"></i>
              <span id="ref-bonus">0% Referrals</span>
            </h4>
              <h4>
              <i class="bi-check2-square bnb-icon"></i>
              <span id="ref-bonus">12 hours Compound Timer</span>
            </h4>
              <h4>
              <i class="bi-check2-square bnb-icon"></i>
              <span>4 hours Withdraw Cooldown</span>
            </h4>
            <h4>
              <i class="bi-check2-square bnb-icon"></i>
              <span id="ref-bonus">Compound <span id="no-tax-compound-count">0</span> times to avoid feedback Tax!</span>
            </h4>
          </div>
          <div class="col-lg-6">
            <div class="stats-row-container">
              <div class="stat">
                <div class="header">
                  Total<span class="busd"> CRO </span>Staked
                </div>
                <strong class="number" id="total-staked">-</strong>
                <div class="usd">
             <!--     ??? $<span id="total-staked-usd" class="usd" >- </span> USD -->
                </div> 
              </div>
              <div class="stat">
                <div class="header">
                  Total Referral<span class="busd"> CRO </span>
                </div>
                <strong class="number" id="total-ref">-</strong>
                <div class="usd">
           <!--       ??? $<span id="total-ref-usd" class="usd" >- </span> USD -->
                </div>  
              </div>
              <div class="stat">
                <div class="header">
                  Contract<span class="busd"> CRO </span>
                </div>
                <strong id="contract-balance" class="number">-</strong>
                <div class="usd">
          <!--        ??? $<span id="contract-balance-usd" >- </span> USD -->
                </div>  
              </div>
              <div class="stat">
                <div class="header">
				          <br>
                  Total<span class="busd">Deposit</span>Count
                </div>
                <strong class="number" id="total-players">-</strong>
              </div>
              <!-- <div class="stat">
                <div class="header">
                  Audited By
                </div>
                <img  style="height: 50px;" src="./assets/img/ccs-audit.jpg" alt=""></img>
                <div>Cyber Crime Shield</div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-2">
          <div class="col-xl-12 disclaimer">
            <i class="ri-alert-line"></i>
            <span>
              <strong>Sustainability!</strong> To further prolong the life of the project, we recommend a 6 days compound and 1 day withdraw strategy, this will be beneficial for the project and the investors long term profit.
            </span>
          </div>
        </div>
      </div>
    </div>
  </section><!-- End Hero -->

  <main id="main">
    <section id="mine" class="bg d-flex">
      <div class="container main" data-aos="fade-up">
        <div class="content-box">
          <h4>
            Dashboard
          </h4>
          <div class="row stats-row-container">
            <div class="col-lg-2 stat">
              <div class="header">
                <i class="bi-bank"></i>
                <span>Initial Deposit</span>
              </div>
              <strong id="initial-deposit" class="number">-</strong>
              <div>
                <strong class="busd"> CRO </strong>
              </div>
              <div class="usd">
        <!--        ??? $<span id="initial-deposit-usd" >-</span> USD -->
              </div> 
            </div>
            <div class="col-lg-2 stat">
              <div class="header">
                <i class="bi-bank"></i>
                Total Deposit
              </div>
              <strong id="total-deposit" class="number">-</strong>
              <div>
                <strong class="busd"> CRO </strong>
              </div>
              <div class="usd">
         <!--       ??? $<span id="total-deposit-usd" >-</span> USD -->
              </div>  
            </div>
            <div class="col-lg-2 stat">
              <div class="header">
                <i class="bi-wallet2"></i>
                Withdrawn
              </div>
              <div>
                <strong id="total-withdrawn" class="number">-</strong>
              </div>
              <div>
                <strong class="busd"> CRO </strong>
              </div>
              <div class="usd">
      <!--          ??? $<span id="total-withdrawn-usd" >- </span> USD -->
              </div> 
            </div>
            <div class="col-lg-2 stat">
              <div class="header">
                <i class="bi-people"></i>
                Referral Rewards
                (<span id="ref-count">-</span>)
              </div>
              <div>
                <strong id="ref-rewards-bnb" class="number">-</strong>
              </div>
              <div>
                <strong class="busd"> CRO </strong>
              </div>
              <div class="usd">
        <!--        ??? $<span id="ref-rewards-usd" >- </span> USD -->
              </div> 
            </div>
          </div>
		  
              <span>
			    <i class="ri-alert-line"></i>
                <strong class="busd">Note:</strong> Funds that are deposited (including compounds) cannot be withdrawn, however the miner will pay daily dividends and
				  referrals rewards for the life of the contract. Please use at your own risk. Remember, never invest more than you can afford to lose
				  and always do your own research!
              </span>
          <div class="row mt-5" style="justify-content: space-evenly;">
            <div class="col-xl-5 first-box">
              <div class="mine-card">
                <div class="row example">
                  <div class="col-lg-8">
                    <div style="line-height: 1.8;">
                      <strong>
                        Hiring Example
                      </strong>
                      <div>
                        <div>100<span class="busd"> CRO </span>gets you:</div>
                        <div>
                          <i class="bi-minecart"></i>
                          Miners:
                          <span id="example-miners">0</span>
                        </div>
                        <div>
                          <i class="ri-coins-line ri-1x"></i>
                          Daily:
                          <span id="example-bnb">0</span><span class="busd"> CRO </span>
                          <span class="usd">
                  <!--          ??? $<span id="example-usd">0 </span><span> USD</span> -->
                          </span> 
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="wallet">
                      <i class="bi-wallet2"></i>
                      <strong>Wallet</strong>
                      <div>
                        <span id="user-balance">0</span><span class="busd"> CRO </span>
                        <div class="usd" style="text-align: unset;">
                   <!--       ??? $<span id="user-balance-usd">0 </span> USD -->
                        </div>  
                      </div>
                    </div>
                  </div>
                </div>
				<div class="timer">
                    <i class="bi-hourglass-split"></i>
                    Cart will be full in
                  </div>
                  <div style="text-align: center; padding-bottom: 7px;"><span id="claim-timer">--:--:--</span></div>
				  <br>
                <strong>
                  <i class="bi-bank"></i>
                  Deposit <span class="busd"> CRO </span>
                  <span class="usd">
						( min<span class="busd" id="min-deposit">0 </span>, 
					  </span>	
				  <span class="usd">
					max<span class="busd" id="max-deposit">0</span>)
				  </span>
                  <input class="form-control" id="bnb-spend" name="buy-miners" onChange="updateBuyPrice()" step="100" type="number" value="100">
                </strong>
                <br>
                <button class="btn glow-on-hover" id="buy-eggs-btn" onclick="buyEggs()" role="button" disabled style="margin-top: 4px;">
                  Hire
                  <span id="eggs-to-buy">0</span>
                  Miners
                </button>
              </div>
            </div>
            <div class="col-xl-5">
              <div class="mine-card">
                <div class="miners-info" style="margin-bottom: unset;">
                  <div>
                    <i class="bi-minecart"></i>
                    <span id="your-miners">- </span>
                    Miners
                  </div>
                  <div>
                    <i class="bi-arrow-down-short" style="font-size: 23px;"></i>
                  </div>
                  <div style="font-size: 21px;">
                    <i class="ri-coins-line ri-1x"></i>
                    <strong id="mined">-</strong>
                    <span><strong class="busd"> CRO </strong></span>
                  </div>
				  <br><br>
                  <span class="usd" style="font-size: 14px;">
             <!--       ??? $<span id="mined-usd" >- </span> USD -->
                  </span> 
                  <div class="usd" style="font-size: 14px; padding: 15px 0 25px 0">
                    <strong>Estimated daily yield</strong>
                   <div>
                      <span id="eggs-per-day">0</span><strong class="busd"> CRO </strong>
              <!--         ??? $<span id="eggs-per-day-usd">-</span> USD -->
                    </div> 
                  </div>
                </div>
                <div>
				  <div class="timer" style="color:white;">
				<i class="bi-arrow-repeat"></i>
    			Compound Count: 
				</div>
				<div style="text-align: center;"><span id="compound-count">0 Day/s</span></div>
				<br><br>
                  <div class="btn-container">
                    <div>
                      <button class="btn glow-on-hover" id="withdraw" onclick="sellEggs()" role="button" disabled>
                        Withdraw
                        <span class="cooldown" id="cooldown-timer">in --:--:--</span>
                        <span class="tax" id="withdraw-tax">-60% tax</span>
                      </button>
                    </div>
                    <br>
                    <div>
                      <button class="btn glow-on-hover" id="reinvest" onclick="hatchEggs()" role="button" disabled>
                        Compound
                        <span class="compound">
                          (<span class="compound" id="compound-bonus">+0% bonus</span>)
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 sub-section">
          Every time you compound after the compound interval, your compound bonus grows by
          <span id="compound-percent">-%</span>
          (max <span id="max-compound">+-%</span>). Withdrawing will reset your bonus to 0.
          Time until next compound bonus is activated: <span style="font-weight: 700;" id="compound-timer">--:--:--</span>
        </div>
        <div class="row">
          <div class="col-lg-12 referral-link">
            <span>
              <i class="bi-check2-square"></i>
              Earn
              <span id="ref-percent">-%</span>
              <span>when someone uses your referral link!</span>
              <span>
                <a id="reflink"></i></a><span onclick="copyRef()"><i class="ri-file-copy-line"></i><span id="copied"></span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
    <!-- End Dashboard Section -->
    <!-- ======= Frequently Asked Questions Section ======= -->
    <section id="faq" class="bg faq section-bg">
      <div class="container" data-aos="fade-up">
        <h4 style="justify-content: center;">FAQ</h4>
        <div class="faq-list">
          <ul>
            <li>
              <i class="bx bx-help-circle icon-help"></i>
              <a
                data-bs-toggle="collapse"
                class="collapse"
                data-bs-target="#faq-list-1"
                >What is the Cronos Token Printer?
                <i class="bx bx-chevron-down icon-show"></i
                ><i class="bx bx-chevron-up icon-close"></i
              ></a>
              <div
                id="faq-list-1"
                class="collapse show"
                data-bs-parent=".faq-list"
              >
                <p>
                  The Cronos Printer is a decentralized game built on the Cronos Chain. 
                  The object of the game is to buy more printers sooner and more often than other players. This in turn earns you more CRO faster. 
                  These printers work for you tirelessly, giving you a daily average of 3.33% of your Cronos value. 
                  The daily percentage return depends on players' actions that are taken within the platform that impact the Cronos efficiency rate. 
                  The mining efficiency rate rises and falls as users buy printers, re-compound your earned CRO or sell your CRO. 
                  Once printers are bought, they cannot be sold, and the investment made to recruit them (either through recruit or re-compound) cannot be taken back. 
                  However, once bought, the printers will not stop producing yield.
                  <p>
                  NOTE: The sustainability and longevity of this game will depend on every single players' actions. 
                  It is crucial to re-compound your earnings at least as often as you withdraw them. The moment someone doesn't do their part, 
                  the game as a whole starts to suffer. It is also important to spread the word and recruit more players to join. 
                  If every person brings in two people, and everyone plays the game as it's meant to be played, everyone wins. 
                  Do your part and this game will last a really long time!
                </p>
              </div>
            </li>

            <li>
              <i class="bx bx-help-circle icon-help"></i>
              <a
                data-bs-toggle="collapse"
                class="collapse"
                data-bs-target="#faq-list-2"
                >Yeah, but how do miners work?
                <i class="bx bx-chevron-down icon-show"></i
                ><i class="bx bx-chevron-up icon-close"></i
              ></a>
              <div
                id="faq-list-2"
                class="collapse show"
                data-bs-parent=".faq-list"
              >
              <p>
                The Cronos Printer has several anti-dumping and anti-whale measures in place to ensure the longevity of the project. 
                These measures include maximum deposits, as well as a cutoff time AND a cooldown time for withdrawals.
                <p>
                The cutoff time is the amount of time it will take for your "bag" to be full of rewards. 
                Once the bag is full, it will stop filling until you've taken some action in the game. 
                This is to prevent whales from letting their rewards accumulate for a long time, 
                and removes the false impression the contract value is going up when most of it is rewards the whale is waiting to withdraw at once.
                <p>
                The cooloff time is the amount of time one has to wait before they can make another withdrawal. 
                This also prevents the contract balance from decreasing in value too fast. 
                If the team decides it's necessary to protect the contract balance, 
                this time period can be adjusted to slow down the rate of withdrawals, 
                but it can only be set to a value less than or equal to 24 hours (per contract rules).
                <p>
                To reward players for playing the game, 
                there is a bonus when you re-compound your daily ore earnings instead of selling them. 
                The bonus increases 4% every 12 hours that you compound without withdrawing (56% max after 7 days). 
                This incentivizes the user to compound more often, which will help boost the games efficiency rate in the long run. 
                To be able to utilize the re-compound bonus feature, the player must not compound before the provided timer reaches 00:00:00.
                <p>
                For the players who choose to not play the game and only sell, 
                there will be a 40% tax on those sells that will stay in the contract. 
                If the player makes two or more consecutive sells, this tax will be applied. 
                Selling that are made following a re-hire action (after the 12 hour cooldown) will be exempt from the tax.
                <p>
                The Cronos Printer also has a very unique feature that has never been done before which effectively decreases the amount of hiring inflation 
                that occurs over a long period of time. 
                Every sell action will only add 50% of the amount sold to the total supply. Other games add 100% of what is sold to the total supply. 
                This means the contract will have a lower inflation rate, 
                keeping the printers market supply more scarce and more valuable than other similar games.
                </p>
              </div>
            </li>


            <li>
              <i class="bx bx-help-circle icon-help"></i>
              <a
                data-bs-toggle="collapse"
                class="collapse"
                data-bs-target="#faq-list-3"
                >What makes this miner different?
                <i class="bx bx-chevron-down icon-show"></i
                ><i class="bx bx-chevron-up icon-close"></i
              ></a>
              <div
                id="faq-list-3"
                class="collapse show"
                data-bs-parent=".faq-list"
              >
              <p>
                This games work similarly to a financial market, where an asset has intrinsic value that is relative to the supply or demand of said asset. 
                  Printers are purchased with a pre-determined currency at a price relative to the Printers current mining efficiency rate. 
                  After the Printers are purchased, they go to work for you right away to give you the best yield on your investment possible, 
                  for as long as possible. Just as any other asset bought and sold on an open market, the price of a Printers will fluctuate over time, 
                  as will the mining efficiency rate, as you and other players recruit Printers, compound earnings and sell earnings. 
                  To put it plainly, the more demand for the Printers, the more they will increase in value and the more yield they will produce. 
                  Inversely, when the demand decreases, so will the value of the Printers and their daily return on investment.
                <p>
                The main difference between a this game and a traditional financial market is that a recruited Printers cannot be sold, 
                  only the value they provide can be sold. As the players of the game as a whole compound their earnings and make new deposits, 
                  the game efficiency rate will stay relatively constant, but the moment players start to sell more than they are compounding, 
                  the efficiency rate will begin to drop as to preserve the TVL and longevity of the game.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- End Frequently Asked Questions Section -->
  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong><span> Cronos Token Printers </span></strong>. All Rights Reserved
      </div>
    </div>
  </footer><!-- End Footer -->

  <div id="preloader">
    <br /><br />
    <table width="100%" height="100%" border="1">
      <tbody>
        <tr>
          <td align="center" valign="middle">
            <img
              width="700px"
              height="600px"
              src="assets/img/CRO.png"
              alt=""
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>
  <script type="text/javascript" src="assets/js/main_eth.js"></script>
</body>

</html>
