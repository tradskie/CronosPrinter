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
var lastUpdate=new Date().getTime()
var contractBalance;

var compoundPercent=0;
var compoundMaxDays=0;
var compoundStep=0;

var cutoffStep=0;
var withdrawCooldown=0;

var contract;

//const minerAddress = '0x94844230b417e437A4bC8D4d0562f84bbD47F212'; //testnet contract
//const tokenAddress = '0x133bDAcbDc746d2AB005633B99ee49C75066f0AD'; //testnet SPO
const minerAddress = '0x62d1df356ffFEF35AF9a5B7619783EBD3Dc863e8'; //mainnet contract   0xcD17fB7F6Fe2C431D7cDeE57678a860a6127e219
//const tokenAddress = '0x3b56a620d8a4f68049964CfFe674Da9174193bC2'; //mainnet SPO



var tokenContract;

var started = true;

var canSell = true;


const minerAbi = [{"inputs":[{"internalType":"address payable","name":"_owner","type":"address"},{"internalType":"address payable","name":"_dev1","type":"address"},{"internalType":"address payable","name":"_dev2","type":"address"},{"internalType":"address payable","name":"_mkt","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"BONUS_COMPOUND_STEP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"BONUS_DAILY_COMPOUND","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"BONUS_DAILY_COMPOUND_BONUS_MAX_TIMES","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"value","type":"address"}],"name":"CHANGE_DEV1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"value","type":"address"}],"name":"CHANGE_DEV2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"value","type":"address"}],"name":"CHANGE_MKT_WALLET","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"value","type":"address"}],"name":"CHANGE_OWNERSHIP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"COMPOUND_BONUS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMPOUND_BONUS_MAX_TIMES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMPOUND_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CUTOFF_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEV","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EGGS_TO_HIRE_1MINERS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EGGS_TO_HIRE_1MINERS_COMPOUND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MARKET_EGGS_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MARKET_EGGS_DIVISOR_SELL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_INVEST_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MKT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_DEV","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_EGGS_TO_HIRE_1MINERS","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_EGGS_TO_HIRE_1MINERS_COMPOUND","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_MARKET_EGGS_DIVISOR","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_MARKET_EGGS_DIVISOR_SELL","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_MKT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"PRC_REFERRAL","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"REFERRAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_CUTOFF_STEP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_MIN_INVEST_LIMIT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_WALLET_DEPOSIT_LIMIT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_WITHDRAWAL_TAX","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_WITHDRAW_COOLDOWN","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_WITHDRAW_DAYS_TAX","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"WALLET_DEPOSIT_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_TAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_TAX_DAYS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAW_COOLDOWN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyEggs","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"}],"name":"calculateEggBuy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"}],"name":"calculateEggBuySimple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eggs","type":"uint256"}],"name":"calculateEggSell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eggs","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"calculateEggSellForYield","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rt","type":"uint256"},{"internalType":"uint256","name":"rs","type":"uint256"},{"internalType":"uint256","name":"bs","type":"uint256"}],"name":"calculateTrade","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dev1","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dev2","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adr","type":"address"}],"name":"getAvailableEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adr","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getDailyCompoundBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getEggsSinceLastHatch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getEggsYield","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyEggs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyMiners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSiteInfo","outputs":[{"internalType":"uint256","name":"_totalStaked","type":"uint256"},{"internalType":"uint256","name":"_totalDeposits","type":"uint256"},{"internalType":"uint256","name":"_totalCompound","type":"uint256"},{"internalType":"uint256","name":"_totalRefBonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTimeStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adr","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"_initialDeposit","type":"uint256"},{"internalType":"uint256","name":"_userDeposit","type":"uint256"},{"internalType":"uint256","name":"_miners","type":"uint256"},{"internalType":"uint256","name":"_claimedEggs","type":"uint256"},{"internalType":"uint256","name":"_lastHatch","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"},{"internalType":"uint256","name":"_referrals","type":"uint256"},{"internalType":"uint256","name":"_totalWithdrawn","type":"uint256"},{"internalType":"uint256","name":"_referralEggRewards","type":"uint256"},{"internalType":"uint256","name":"_dailyCompoundBonus","type":"uint256"},{"internalType":"uint256","name":"_lastWithdrawTime","type":"uint256"},{"internalType":"uint256","name":"_withdrawCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"isCompound","type":"bool"}],"name":"hatchEggs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"marketEggs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mkt","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellEggs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token_SPO","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCompound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"initialDeposit","type":"uint256"},{"internalType":"uint256","name":"userDeposit","type":"uint256"},{"internalType":"uint256","name":"miners","type":"uint256"},{"internalType":"uint256","name":"claimedEggs","type":"uint256"},{"internalType":"uint256","name":"lastHatch","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint256","name":"referralsCount","type":"uint256"},{"internalType":"uint256","name":"referralEggRewards","type":"uint256"},{"internalType":"uint256","name":"totalWithdrawn","type":"uint256"},{"internalType":"uint256","name":"dailyCompoundBonus","type":"uint256"},{"internalType":"uint256","name":"withdrawCount","type":"uint256"},{"internalType":"uint256","name":"lastWithdrawTime","type":"uint256"}],"stateMutability":"view","type":"function"}]

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
        return parseFloat(num).toFixed(4)
    }
    return parseFloat(parseFloat(num).toFixed(2));
}

function refreshData() {
    console.log('Refreshing data...')
     try {
         tokenPrice(function(croPrice){
             var priceJson = JSON.parse(croPrice)
             priceInUSD = +priceJson['crypto-com-chain']['usd'];
         });
     } catch { priceInUSD = 0; }

    contract.methods.EGGS_TO_HIRE_1MINERS().call().then(eggs => {
        eggstohatch1 = eggs
        var dailyPercent = Number((86400 / eggstohatch1) * 100).toFixed(2);
        var apr = dailyPercent * 365;
        $("#daily-rate").html(`${dailyPercent}% Daily ~ ${apr}% APR`);
    }).catch((err) => {
        console.log('EGGS_TO_HIRE_1MINERS', err);
    });

    contract.methods.COMPOUND_BONUS().call().then(r => {
        compoundPercent = r / 10;
        $("#daily-compound").html(`${compoundPercent}% Recruit Bonus`)
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
        var refPercent = Number(r / 10).toFixed(0);
        $("#ref-bonus").html(`${refPercent}% Game Referral Bonus`)
        $("#ref-percent").html(`${refPercent}%`)
    }).catch((err) => {
        console.log('REFERRAL', err);
    });

    contract.methods.COMPOUND_BONUS_MAX_TIMES().call().then(r => {
        compoundMaxDays = r;
        var maxCompoundPercent = r*compoundPercent;
        $("#max-compound").html(`+${maxCompoundPercent}%`)
    }).catch((err) => {
        console.log('COMPOUND_BONUS_MAX_TIMES', err);
    });

    contract.methods.WALLET_DEPOSIT_LIMIT().call().then(cro => {
        maxDeposit = cro;
        $("#max-deposit").html(`${readableCroAmount(cro)} CRO`)
    }).catch((err) => {
        console.log('WALLET_DEPOSIT_LIMIT', err);
    });
	
	contract.methods.MIN_INVEST_LIMIT().call().then(cro => {
        minDeposit = cro;
        $("#min-deposit").html(`${readableCroAmount(cro)} CRO`)
    }).catch((err) => {
        console.log('MIN_INVEST_LIMIT', err);
    });

    contract.methods.COMPOUND_STEP().call().then(step => {
        compoundStep = step;
    }).catch((err) => {
        console.log(err);
    });

    /** How many miners and eggs per day user will recieve for 500 Space Ore deposit **/
    contract.methods.getEggsYield().call().then(result => {
        var miners = result[0];
        var cro = result[1];
        var amt = readableCroAmount(cro, 4);

        $("#example-miners").html(miners)
		$("#example-cro").html(amt)
         var usd = Number(priceInUSD*amt).toFixed(2);
         $("#example-usd").html(usd)
    }).catch((err) => {
        console.log('getEggsYield', err);
    });
	

        contract.methods.getBalance().call().then(balance => {
            contractBalance = balance;
            var amt = web3.utils.fromWei(balance)
	    $('#contract-balance').html((+amt).toFixed(2));
            $('#contract-balance').html(amt);
             var usd = Number(priceInUSD*amt).toFixed(2);
             $("#contract-balance-usd").html(usd)
        }).catch((err) => {
            console.log('getBalance', err);
        });

        contract.methods.getSiteInfo().call().then(result => {
            var staked = web3.utils.fromWei(result._totalStaked);
	    $('#total-staked').html((+staked).toFixed(2));	
            $('#total-staked').html(staked);
             var stakedUSD = Number(priceInUSD*staked).toFixed(2);
             $("#total-staked-usd").html(stakedUSD)
            $('#total-players').html(result._totalDeposits);
            var ref = result._totalRefBonus;
            if (ref > 0) {
                var refCRO = readableCroAmount(ref, 2);
                $("#total-ref").html(refCRO);
                 var refUSD = Number(priceInUSD*refCRO).toFixed(2);
                 $('#total-ref-usd').html(refUSD)
            }
        }).catch((err) => {
            console.log('getSiteInfo', err);
        });
    }

     web3.eth.getBalance(currentAddr).then(userBalance => {
         usrBal = userBalance;
         var amt = web3.utils.fromWei(userBalance);
         $("#user-balance").html(roundNum(amt));
         var usd = Number(priceInUSD*amt).toFixed(2);
         $("#user-balance-usd").html(usd)
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
                var croMined = readableCroAmount(earnings, 4)
                $("#mined").html(croMined);
                 var minedUsd = Number(priceInUSD*croMined).toFixed(2);
                 $('#mined-usd').html(minedUsd)
            }).catch((err) => {
                console.log('getAvailableEarnings', err);
                throw err;
            });
        } else {
            $("#mined").html(0);
        }

        if (referralEggRewards > 0) {
            var refCRO = readableCroAmount(referralEggRewards, 2);
            $("#ref-rewards-cro").html(refCRO);
             var refUSD = Number(priceInUSD*refCRO).toFixed(2);
             $('#ref-rewards-usd').html(refUSD)
            $('#ref-count').html(referrals);
        } else {
            $("#ref-rewards").html("0".concat(' '.concat('Miners')));
        }

        setInitialDeposit(initialDeposit);
        setTotalDeposit(userDeposit);
        setTotalWithdrawn(totalWithdrawn);


        if (miners > 0) {
            var eggsPerDay = 24*60*60 * miners ;
            contract.methods.calculateEggSellForYield(eggsPerDay, web3.utils).call().then(earnings => {
                var eggsCRO = readableCroAmount(earnings, 4)
                $("#eggs-per-day").html(eggsCRO);
                 var eggsUSD = Number(priceInUSD*eggsCRO).toFixed(2);
                 $('#eggs-per-day-usd').html(eggsUSD)
            }).catch((err) => {
                console.log('calculateEggSellForYield', err);
                throw err;
            });
        }

        if (withdrawCount >= 1) {
            contract.methods.WITHDRAWAL_TAX().call().then(tax => {
                $("#withdraw-tax").html(`(-${tax/10}% tax)`)
            }).catch((err) => {
                console.log('WITHDRAWAL_TAX', err);
                throw err;
            });
        } else {
            $('#withdraw-tax').attr('hidden', true)
        }
    }).catch((err) => {
        console.log('getUserInfo', err);
    });

    updateBuyPrice();
    console.log('Done refreshing data...')

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
    var initialCRO = readableCroAmount(initialDeposit, 2);
     var initialUSD = Number(priceInUSD*initialCRO).toFixed(2);
    $("#initial-deposit").html(initialCRO);
     $("#initial-deposit-usd").html(initialUSD);
}

function setTotalDeposit(totalDeposit) {
    var totalCRO = readableCroAmount(totalDeposit, 2);
     var totalUSD = Number(priceInUSD*totalCRO).toFixed(2);
    $("#total-deposit").html(totalCRO);
     $("#total-deposit-usd").html(totalUSD);
}

function setTotalWithdrawn(totalWithdrawn) {
    var totalCRO = readableCroAmount(totalWithdrawn, 2);
     var totalUSD = Number(priceInUSD*totalCRO).toFixed(2);
    $("#total-withdrawn").html(totalCRO);
     $("#total-withdrawn-usd").html(totalUSD);
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
    var endDate = new Date('December 15, 2021 7:00 EST').getTime();

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

function updateBuyPrice(cro) {
    if (cro == undefined || !cro) {
        cro = document.getElementById('cro-spend').value;
    }
    contract.methods.calculateEggBuySimple(web3.utils.toWei(cro)).call().then(eggs => {
        $("#eggs-to-buy").html(parseFloat(eggs/eggstohatch1).toFixed(2));
    });
}


function buyEggs(){
    var spendDoc = document.getElementById('cro-spend')
    var cro = spendDoc.value;
	
    var amt = web3.utils.toWei(cro);
	if(+amt < +minDeposit) {
		alert(`you cannot deposit less than ${readableCroAmount(minDeposit, 2)} CRO`);
        return
    }
	
	var amt = web3.utils.toWei(cro);
	if(+amt + +totalDeposits > +maxDeposit) {
		alert(`you cannot deposit more than ${readableCroAmount(maxDeposit, 2)} CRO`);
        return
    }
	
    if(+amt > usrBal) {
		alert("you do not have " + cro + " CRO in your wallet");
        return
    }
    if (+spend < +cro) {
        var amtToSpend = cro - spend;
        alert("you first need to approve " + amtToSpend + " CRO before depositing");
        return
    }

    let ref = getQueryVariable('ref');
    if (cro > 0) {
        if (!web3.utils.isAddress(ref)) { ref = currentAddr }
        contract.methods.buyEggs(ref, amt).send({ from: currentAddr }).then(result => {
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

function getBalance(callback){
    contract.methods.getBalance().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function tokenPrice(callback) {
	const url = "https://api.coingecko.com/api/v3/simple/price?ids=crypto-com-chain&vs_currencies=usd";
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

function readableCroAmount(amount, decimals) {
  return (amount / 1e18).toFixed(decimals);
}
