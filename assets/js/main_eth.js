var currentAddr = null;
var web3;
var spend;
var usrBal;
var priceInUSD;
var lastNumEggs=-1
var lastNumMiners=-1
var lastSecondsUntilFull=100
var lastHatchTime=0
var eggstohatch1=0
var maxDeposit=0
var minDeposit=0
var totalDeposits=0
var lastUpdate = new Date().getTime()
var contractBalance;

var compoundPercent=0;
var compoundMaxDays=0;
var compoundCount=0;
var compoundStep=0;
var cutoffStep=0;
var withdrawCooldown=0;

var contract;

const minerAddress = '0xA713Dc7eeA81724d5526f583a42Fa1827cBa3c75'; // mainnet contract

var started = true;
var canSell = true;

const minerAbi = [{"inputs":[{"internalType":"address payable","name":"_owner","type":"address"},{"internalType":"address payable","name":"_dev1","type":"address"},{"internalType":"address payable","name":"_dev2","type":"address"},{"internalType":"address payable","name":"_mkt","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"BONUS_COMPOUND_STEP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"BONUS_DAILY_COMPOUND","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"BONUS_DAILY_COMPOUND_BONUS_MAX_TIMES","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"value","type":"address"}],"name":"CHANGE_DEV1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"value","type":"address"}],"name":"CHANGE_DEV2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"value","type":"address"}],"name":"CHANGE_MKT_WALLET","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"value","type":"address"}],"name":"CHANGE_OWNERSHIP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"COMPOUND_BONUS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMPOUND_BONUS_MAX_TIMES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMPOUND_FOR_NO_TAX_WITHDRAWAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMPOUND_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CUTOFF_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EGGS_TO_HIRE_1MINERS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MARKET_EGGS_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MARKET_EGGS_DIVISOR_SELL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_INVEST_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_DEV","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_EGGS_TO_HIRE_1MINERS","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_MARKET_EGGS_DIVISOR","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_MKT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_REFERRAL","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"REFERRAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_COMPOUND_FOR_NO_TAX_WITHDRAWAL","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_CUTOFF_STEP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_MIN_INVEST_LIMIT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_WALLET_DEPOSIT_LIMIT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_WITHDRAWAL_TAX","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_WITHDRAW_COOLDOWN","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"WALLET_DEPOSIT_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_TAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAW_COOLDOWN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"buyEggs","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"}],"name":"calculateEggBuy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"}],"name":"calculateEggBuySimple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eggs","type":"uint256"}],"name":"calculateEggSell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eggs","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"calculateEggSellForYield","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rt","type":"uint256"},{"internalType":"uint256","name":"rs","type":"uint256"},{"internalType":"uint256","name":"bs","type":"uint256"}],"name":"calculateTrade","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adr","type":"address"}],"name":"getAvailableEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adr","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getDailyCompoundBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getEggsSinceLastHatch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getEggsYield","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyEggs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyMiners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSiteInfo","outputs":[{"internalType":"uint256","name":"_totalStaked","type":"uint256"},{"internalType":"uint256","name":"_totalDeposits","type":"uint256"},{"internalType":"uint256","name":"_totalCompound","type":"uint256"},{"internalType":"uint256","name":"_totalRefBonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTimeStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adr","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"_initialDeposit","type":"uint256"},{"internalType":"uint256","name":"_userDeposit","type":"uint256"},{"internalType":"uint256","name":"_miners","type":"uint256"},{"internalType":"uint256","name":"_claimedEggs","type":"uint256"},{"internalType":"uint256","name":"_lastHatch","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"},{"internalType":"uint256","name":"_referrals","type":"uint256"},{"internalType":"uint256","name":"_totalWithdrawn","type":"uint256"},{"internalType":"uint256","name":"_referralEggRewards","type":"uint256"},{"internalType":"uint256","name":"_dailyCompoundBonus","type":"uint256"},{"internalType":"uint256","name":"_lastWithdrawTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"isCompound","type":"bool"}],"name":"hatchEggs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"seedMarket","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"sellEggs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalCompound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"initialDeposit","type":"uint256"},{"internalType":"uint256","name":"userDeposit","type":"uint256"},{"internalType":"uint256","name":"miners","type":"uint256"},{"internalType":"uint256","name":"claimedEggs","type":"uint256"},{"internalType":"uint256","name":"lastHatch","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint256","name":"referralsCount","type":"uint256"},{"internalType":"uint256","name":"referralEggRewards","type":"uint256"},{"internalType":"uint256","name":"totalWithdrawn","type":"uint256"},{"internalType":"uint256","name":"dailyCompoundBonus","type":"uint256"},{"internalType":"uint256","name":"lastWithdrawTime","type":"uint256"}],"stateMutability":"view","type":"function"}]

// ------ contract calls

function loadContracts() {
    console.log('Loading contracts...')
    web3 = window.web3
    contract = new web3.eth.Contract(minerAbi, minerAddress);
    console.log('Done loading contracts.')
}

function myReferralLink(address) {
    var prldoc = document.getElementById('reflink')
    prldoc.textContent = window.location.origin + "?ref=" + address
    var copyText = document.getElementById("reflink");
    copyText.value = prldoc.textContent
}

async function connect() {
    console.log('Connecting to wallet...')
    try {
        if (started) {
            $('#buy-eggs-btn').attr('disabled', false)
        }
        var accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length == 0) {
            console.log('Please connect to MetaMask.');
            $('#enableMetamask').html('Connect')
        } else if (accounts[0] !== currentAddr) {
            currentAddr = accounts[0];
            if (currentAddr !== null) {
                myReferralLink(currentAddr)
                console.log('Wallet connected = '+ currentAddr)

                loadContracts()
                refreshData()

                let shortenedAccount = currentAddr.replace(currentAddr.substring(5, 38), "***")
                $('#enableMetamask').html(shortenedAccount)
            }
            $('#enableMetamask').attr('disabled', true)
        }
    } catch (err) {
        if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert('Please connect to MetaMask.');
        } else {
            console.error(err);
        }
        $('#enableMetamask').attr('disabled', false)
    }
}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        $('#enableMetamask').attr('disabled', false)
        if (window.ethereum.selectedAddress !== null) {
            await connect();
                setTimeout(function () {
                controlLoop()
                controlLoopFaster()
            }, 1000)
        }
    } else {
        $('#enableMetamask').attr('disabled', true)
    }
}

window.addEventListener('load', function () {
    setStartTimer();
    loadWeb3()
})

$('#enableMetamask').click(function () {
    connect()
});

function controlLoop() {
    refreshData()
    setTimeout(controlLoop, 25000)
}

function controlLoopFaster() {
    setTimeout(controlLoopFaster, 30)
}

function roundNum(num) {
    if (num == 0) { return 0};
    if (num < 1) {
        return parseFloat(num).toFixed(4);
    }
    return parseFloat(parseFloat(num).toFixed(2));
}

function refreshData() {
    console.log('Refreshing data...')
    // try {
    //     tokenPrice(function(bnbPrice){
    //         var priceJson = JSON.parse(bnbPrice)
    //         priceInUSD = +priceJson['binancecoin']['usd'];
    //     });
    // } catch { priceInUSD = 0; }

    contract.methods.EGGS_TO_HIRE_1MINERS().call().then(eggs => {
        eggstohatch1 = eggs
        var dailyPercent = Number((86400 / eggstohatch1) * 100);
        var apr = dailyPercent * 365;
        $("#daily-rate").html(`${dailyPercent}% Daily ~ ${apr}% APR`);
    }).catch((err) => {
        console.log('EGGS_TO_HIRE_1MINERS', err);
    });

    contract.methods.COMPOUND_BONUS().call().then(r => {
        compoundPercent = r / 10;
        $("#daily-compound").html(`${compoundPercent}% Compound Bonus`)
        $("#compound-percent").html(`${compoundPercent}%`)
    }).catch((err) => {
        console.log('COMPOUND_BONUS', err);
    });

    contract.methods.CUTOFF_STEP().call().then(cutoff => {
        cutoffStep = cutoff;
    }).catch((err) => {
        console.log('CUTOFF_STEP', err);
    })

    contract.methods.WITHDRAW_COOLDOWN().call().then(cooldown => {
        withdrawCooldown = cooldown;
    }).catch((err) => {
        console.log('WITHDRAW_COOLDOWN', err);
    })

    contract.methods.REFERRAL().call().then(r => {
        var refPercent = Number(r / 10);
        $("#ref-bonus").html(`${refPercent}% Referral Rewards`)
        $("#ref-percent").html(`${refPercent}%`)
    }).catch((err) => {
        console.log(err);
    });

    contract.methods.COMPOUND_BONUS_MAX_TIMES().call().then(r => {
        compoundMaxDays = r;
        var maxCompoundPercent = r*compoundPercent;
        $("#max-compound").html(`+${maxCompoundPercent}%`)
    }).catch((err) => {
        console.log('COMPOUND_BONUS_MAX_TIMES', err);
    });
	
	contract.methods.COMPOUND_FOR_NO_TAX_WITHDRAWAL().call().then(r => {
        compoundCount = r;
        var maxCompoundForNoTax = compoundCount;
        $("#no-tax-compound-count").html(`${maxCompoundForNoTax}`)
    }).catch((err) => {
        console.log('COMPOUND_FOR_NO_TAX_WITHDRAWAL', err);
    });

    contract.methods.WALLET_DEPOSIT_LIMIT().call().then(bnb => {
        maxDeposit = bnb;
        $("#max-deposit").html(`${readableBNB(bnb)} AVAX`)
    }).catch((err) => {
        console.log('WALLET_DEPOSIT_LIMIT', err);
    });	
	
	contract.methods.MIN_INVEST_LIMIT().call().then(bnb => {
        minDeposit = bnb;
        $("#min-deposit").html(`${readableBNB(bnb)} AVAX`)
    }).catch((err) => {
        console.log('MIN_INVEST_LIMIT', err);
    });

    contract.methods.COMPOUND_STEP().call().then(step => {
        compoundStep = step;
    }).catch((err) => {
        console.log(err);
    });

    /** How many miners and eggs per day user will recieve for 1 AVAX deposit **/
    contract.methods.getEggsYield(web3.utils.toWei('1')).call().then(result => {
        var miners = result[0];
        var bnb = result[1];
        var amt = readableBNB(bnb, 4);

        $("#example-miners").html(miners)
        $("#example-bnb").html(roundNum(amt))
        //var usd = Number(priceInUSD*amt).toFixed(2);
        //$("#example-usd").html(usd)
    }).catch((err) => {
        console.log(err);
    });

    if (started) {
        contract.methods.getBalance().call().then(balance => {
            contractBalance = balance;
            var amt = web3.utils.fromWei(balance);
            $('#contract-balance').html(roundNum(amt));
            //var usd = Number(priceInUSD*amt).toFixed(2);
            //$("#contract-balance-usd").html(usd)
        }).catch((err) => {
            console.log(err);
        });

        contract.methods.getSiteInfo().call().then(result => {
            var staked = web3.utils.fromWei(result._totalStaked);
            $('#total-staked').html(roundNum(staked));
            //var stakedUSD = Number(priceInUSD*staked).toFixed(2);
            //$("#total-staked-usd").html(stakedUSD)
            $('#total-players').html(result._totalDeposits);
            var ref = result._totalRefBonus;
            if (ref > 0) {
                var refBNB = readableBNB(ref, 2);
                $("#total-ref").html(refBNB);
                //var refUSD = Number(priceInUSD*refBNB).toFixed(2);
                //$('#total-ref-usd').html(refUSD)
            } else {
                $('#total-ref-usd').html('0.00');
                $('#total-ref').html('0');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    web3.eth.getBalance(currentAddr).then(userBalance => {
        usrBal = userBalance;
        var amt = web3.utils.fromWei(userBalance);
        $("#user-balance").html(roundNum(amt));
        //var usd = Number(priceInUSD*amt).toFixed(2);
        //$("#user-balance-usd").html(usd)
    }).catch((err) => {
        console.log(err);
    });

    contract.methods.getUserInfo(currentAddr).call().then(user => {
        var initialDeposit = user._initialDeposit;
        var userDeposit = user._userDeposit;
        var miners = user._miners;
        var totalWithdrawn = user._totalWithdrawn;
        var lastHatch = user._lastHatch;
        var referrals = user._referrals;
        var referralEggRewards = user._referralEggRewards;
        var dailyCompoundBonus = user._dailyCompoundBonus;
        var withdrawCount = user._withdrawCount;
        var lastWithdrawTime = user._lastWithdrawTime;

        console.log('withdraw count = ' + withdrawCount)
        console.log('last withdraw time = ' + lastWithdrawTime)

        var now = new Date().getTime() / 1000;

        var diff = (+lastHatch + +compoundStep) - now;
        if (diff > 0) {
            setCompoundTimer(lastHatch);
        } else {
            $(".compound-timer").text("00:00:00");
            $('#reinvest').attr('disabled', false)
        }
        var extraPercent = 0;
        console.log('dailyCompoundBonus = ' + dailyCompoundBonus)
		$("#compound-count").html(`${dailyCompoundBonus} Day/s`);
        if (dailyCompoundBonus > 0) {
            extraPercent += dailyCompoundBonus * compoundPercent;
            $("#compound-bonus").html(`+${extraPercent}% bonus`);
        } else {
            $("#reinvest").text("Compound");
        }

        var cutOffDiff = (+lastHatch + +cutoffStep) - now;
        if (cutOffDiff > 0) {
            setCutoffTimer(lastHatch)
        } else {
            $("#claim-timer").html("00:00:00")
        }

        var coolDownDiff = (+lastHatch + +withdrawCooldown) - now;
        if (coolDownDiff > 0) {
            setCooldownTimer(coolDownDiff)
        } else {
            $("#cooldown-timer").html("");
            $("#withdraw").attr('disabled', false);
        }

        if (miners > 0) {
            $("#your-miners").html(miners);
            contract.methods.getAvailableEarnings(currentAddr).call().then(function (earnings) {
                var bnbMined = readableBNB(earnings, 4)
                $("#mined").html(bnbMined);
                //var minedUsd = Number(priceInUSD*bnbMined).toFixed(2);
                //$('#mined-usd').html(minedUsd)
            }).catch((err) => {
                console.log('getAvailableEarnings', err);
                throw err;
            });
        } else {
            $("#mined").html(0);
        }

        if (referralEggRewards > 0) {
            var refBNB = readableBNB(referralEggRewards, 4);
            $("#ref-rewards-bnb").html(refBNB);
            //var refUSD = Number(priceInUSD*refBNB).toFixed(2);
            //$('#ref-rewards-usd').html(refUSD)
            $('#ref-count').html(referrals);
        } else {
            $("#ref-rewards-bnb").html("0");
            //$('#ref-rewards-usd').html("0.00");
            $('#ref-count').html('0');
        }

        setInitialDeposit(initialDeposit);
        setTotalDeposit(userDeposit);
        setTotalWithdrawn(totalWithdrawn);


        if (miners > 0) {
            var eggsPerDay = 24*60*60 * miners ;
            contract.methods.calculateEggSellForYield(eggsPerDay, web3.utils.toWei('1')).call().then(earnings => {
                var eggsBNB = readableBNB(earnings, 4)
                $("#eggs-per-day").html(eggsBNB);
                //var eggsUSD = Number(priceInUSD*eggsBNB).toFixed(2);
                //$('#eggs-per-day-usd').html(eggsUSD)
            }).catch((err) => {
                console.log('calculateEggSellForYield', err);
                throw err;
            });
        }
	console.log('compoundCount = ' + compoundCount)
        //	    
        if (dailyCompoundBonus < compoundCount) {
            contract.methods.WITHDRAWAL_TAX().call().then(tax => {
                $("#withdraw-tax").html(`(-${tax/10}% tax)`)
            })
        } else {
            $('#withdraw-tax').attr('hidden', true)
        }
    }).catch((err) => {
        console.log('getUserInfo', err);
    });

    updateBuyPrice();
    console.log('Done refreshing data...')
}

function copyRef() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('#reflink').text()).select();
    document.execCommand("copy");
    $temp.remove();
    $("#copied").html("<i class='ri-checkbox-circle-line'> copied!</i>").fadeOut('10000ms')
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function setInitialDeposit(initialDeposit) {
    totalDeposits = initialDeposit;
    var initialBNB = readableBNB(initialDeposit, 2);
    //var initialUSD = Number(priceInUSD*initialBNB).toFixed(2);
    $("#initial-deposit").html(initialBNB);
    //$("#initial-deposit-usd").html(initialUSD);
}

function setTotalDeposit(totalDeposit) {
    var totalBNB = readableBNB(totalDeposit, 2);
    //var totalUSD = Number(priceInUSD*totalBNB).toFixed(2);
    $("#total-deposit").html(totalBNB);
    //$("#total-deposit-usd").html(totalUSD);
}

function setTotalWithdrawn(totalWithdrawn) {
    var totalBNB = readableBNB(totalWithdrawn, 2);
    //var totalUSD = Number(priceInUSD*totalBNB).toFixed(2);
    $("#total-withdrawn").html(totalBNB);
    //$("#total-withdrawn-usd").html(totalUSD);
}

var x;
function setCompoundTimer(lastHatch) {
    $('#reinvest').attr('disabled', true)
    var now = new Date().getTime();
    var diff = (+lastHatch + +compoundStep) - (now / 1000);
    var countDownDate = new Date(+now + +diff * 1000).getTime();

    clearInterval(x)
    x = setInterval(function () {
        var currTime = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - currTime;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + days*24);
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);


        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }

        $("#compound-timer").html(`${hours}h:${minutes}m:${seconds}s`);

        // If the count down is finished, write some text
        if (distance < 0) {
            $("#compound-timer").html("<span>00:00:00</span>");
            $('#reinvest').attr('disabled', false)
        }
    }, 1000, 1);
}

let y;
function setCutoffTimer(lastHatch) {
    var time = new Date().getTime();
    var cutoff = (+lastHatch + +cutoffStep) - (+time/1000);
    var countDownDate = new Date(+time + +cutoff * 1000).getTime();

    clearInterval(y)
    y = setInterval(function() {
        var currentTime = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - currentTime;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + days*24);
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }

        $("#claim-timer").html(`<strong>${hours}h:${minutes}m:${seconds}s</strong>`);

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(y);
            $("#claim-timer").html("<span>0:00:00</span>");
        }
    }, 1000, 1);
}

var z;
function setCooldownTimer(cooldown) {
    $("#withdraw").attr('disabled', true);
    var time = new Date().getTime();
    var endDate = new Date(+time + +cooldown * 1000).getTime();

    clearInterval(z)
    z = setInterval(function() {
        var currTime = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = endDate - currTime;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)  + days*24);
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }

        $("#cooldown-timer").html(`in ${hours}h:${minutes}m:${seconds}s`);

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(z);
            $("#withdraw").attr('disabled', false);
            $("#cooldown-timer").html("");
        }
    }, 1000, 1);
}

var startTimeInterval;
function setStartTimer() {
    var endDate = new Date('February, 18 2022 13:00 EST').getTime();

    clearInterval(startTimeInterval)
    startTimeInterval = setInterval(function() {
        var currTime = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = endDate - currTime;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)  + days*24);
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }

        $("#start-timer").html(`${hours}h:${minutes}m:${seconds}s`);

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(startTimeInterval);
            $("#start-container").remove();
            started = true;
            refreshData()
        }
    }, 1000, 1);
}

function updateBuyPrice(bnb) {
    if (bnb == undefined || !bnb) {
        bnb = document.getElementById('bnb-spend').value;
    }
    contract.methods.calculateEggBuySimple(web3.utils.toWei(bnb)).call().then(eggs => {
        $("#eggs-to-buy").html(parseFloat(eggs/eggstohatch1).toFixed(2));
    });
}


function buyEggs(){
    var spendDoc = document.getElementById('bnb-spend')
    var bnb = spendDoc.value;

    var amt = web3.utils.toWei(bnb);
	if(+amt + +totalDeposits > +maxDeposit) {
		alert(`you cannot deposit more than ${readableBNB(maxDeposit, 2)} AVAX`);
        return
    }
    if(+amt > usrBal) {
		alert("you do not have " + bnb + " AVAX in your wallet");
        return
    }

    let ref = getQueryVariable('ref');
    if (bnb > 0) {
        if (!web3.utils.isAddress(ref)) { ref = currentAddr }
        contract.methods.buyEggs(ref).send({ from: currentAddr, value: amt }).then(result => {
            refreshData()
        }).catch((err) => {
            console.log(err)
        });
    }
}

function hatchEggs(){
    if (canSell) {
        canSell = false;
        console.log(currentAddr)
        contract.methods.hatchEggs(true).send({ from: currentAddr}).then(result => {
            refreshData()
        }).catch((err) => {
            console.log(err)
        });
        setTimeout(function(){
            canSell = true;
        },10000);
    } else {
        console.log('Cannot hatch yet...')
    }
}

function sellEggs(){
    if (canSell) {
        canSell = false;
        console.log('Selling');
        contract.methods.sellEggs().send({ from: currentAddr }).then(result => {
            refreshData()
        }).catch((err) => {
            console.log(err)
        });
        setTimeout(function(){
            canSell = true;
        },10000);
    } else {
        console.log('Cannot sell yet...')
    }
}

function devFee(amount, callback){
    contract.methods.getFees(amount).call().then(result => {
        var projectFee = result._projectFee;
        var marketingFee = result._marketingFee;
        callback(+projectFee + +marketingFee);
    }).catch((err) => {
        console.log(err)
    });
}

function getBalance(callback){
    contract.methods.getBalance().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function tokenPrice(callback) {
	const url = "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,usd&vs_currencies=usd";
	httpGetAsync(url,callback);
}
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

function readableBNB(amount, decimals) {
    var num = amount / 1e18;
    if (num < 1) {
        decimals = 4
    }
    return parseFloat((num).toFixed(decimals));
}
