function home(){window.scrollTo(0,0);}

let web3;
let account;
let balance;
let mintPrice;

const walletObj = document.querySelector(".wallet");
const balanceObj = document.querySelector(".balance");
const priceObj = document.querySelector(".price");
const gasfeeObj = document.querySelector(".gasfee");
const openseaObj = document.querySelector(".opensea");

window.onload = async function () {
    web3 = new Web3(window.ethereum);
    await check_status();
};

const loginWallet = async () => {
    try {
        await ethereum.enable();
    }
    catch (e) {
        let pcDevice = "win16|win32|win64|mac|macintel";
        if (navigator.platform) {
            // 모바일 환경일 경우
            if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
                exeDeepLink();
            } else {
            }
        }
    }
}

const exeDeepLink = () => {
    let url = "https://metamask.app.link/dapp/mjdnft.com/mint";
    window.location.href = url;
}

async function connect() {

    loginWallet();
    
    if (window.ethereum) {
        let isContinue = false;

        await window.ethereum.request({ method: "net_version" }).then((res) => {
            if( (res != 137) && (res != 80001)){
                alert("메타마스크 네트워크를 폴리곤으로 변경해주세요");
            }else{
                isContinue = true;
            }
        });

        if(!isContinue){return;}

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts", });

        account = accounts[0];

        balance = await window.ethereum
            .request({ method: "eth_getBalance", params: [account, "latest"] })
            .catch((err) => {
            });

        balance = web3.utils.fromWei(String(balance), "ether");
        
        
        walletObj.innerHTML = "- 지갑주소 : " + account.substr(0, 12) + "...";
        balanceObj.innerHTML = "- 보유잔액 : " + BigNumber(balance).toFixed(4) + " MATIC";

        await check_status();
    } else {
        alert("메타마스크를 설치하고 활성화해주세요");
        return;
    }
}


async function check_status() {
    const contract = new web3.eth.Contract(ABI, CONTRACTADDRESS);

    await contract.methods
        .mintingInformation()
        .call()
        .then(function (res) {
            mintPrice = parseInt(res[4]);

        priceObj.innerHTML = "- 구매금액 : " + web3.utils.fromWei(String(mintPrice), "ether") + " MATIC";
        gasfeeObj.innerHTML = "- 예상수수료 : 0.001 ~ 0.01 MATIC"
    
        })
        .catch(function (err) {
        });

    openseaObj.innerHTML = "- 오픈씨URL : testnets.opensea.io/kr/collection/tmjd"; 
}

function goOpensea() {
    window.open("https://testnets.opensea.io/kr/collection/tmjd");
}

async function publicMint() {
    if (window.ethereum) {
        await connect();
    } else {
        alert("메타마스크를 설치하고 활성화해주세요");
        return;
    }

    const contract = new web3.eth.Contract(ABI, CONTRACTADDRESS);

    try {
        const result = await contract.methods.publicMint(1).send({
            from: account,
            value: mintPrice.toString(),
        });

        if (result != null) {
            alert("축하합니다! 성공적으로 명주동NFT를 구매하였습니다");
            await connect();
        }
    } catch (err) {
        alert("민팅에 실패하였습니다. 잠시 뒤 재시도 해주시기 바랍니다");
        await connect();
    }
}