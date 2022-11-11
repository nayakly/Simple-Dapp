const {expect} = require('chai');
const { ethers } = require('hardhat');

//mocha is a framework
//chai is a library

//describe block -> Test
// it block ->  Test cases 

describe('Token Contract Testing', function(){
    let token;
    let hardhatToken;
    let owner, bob, lucy, rest;
    // (optional) rest is for holding rest of the accounts

    // beforeEach() runs before each it() block
    beforeEach(async()=>{
        token = await ethers.getContractFactory('token');
        [owner, bob, lucy, ...rest] = await ethers.getSigners();
        hardhatToken = await token.deploy(); //deploy on hardhat's network for testing purposes
    })

    describe('Deployment', function(){

        it('Should set the right owner', async()=>{
            expect(await hardhatToken.owner()).to.equal(owner.address)
        })

        it('Should assign the total supply of tokens to the owner', async()=>{
            const ownerBalance = await hardhatToken.balanceOf(owner.address)
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
        })
    })

    describe('Transactions', function(){

        it('Should transfer tokens between accounts', async()=>{
            // transfer from owner to bob
            await hardhatToken.transfer(bob.address, 100);
            const bobBalance = await hardhatToken.balanceOf(bob.address)
            expect(bobBalance).to.equal(100);

            await hardhatToken.connect(bob).transfer(lucy.address,50)
            const lucyBalance = await hardhatToken.balanceOf(lucy.address)
            expect(lucyBalance).to.equal(50)
        })

        it(`Should fail if sender doesn't have enough tokens`, async()=>{
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address)

            //checking directly instead of creating another variable 
            await expect (hardhatToken.connect(bob).transfer(owner.address, 10)).to.be.revertedWith("Not enough tokens") //same error message as in our solidity code
            // Syntax from Chai Library - to.be.revertedWith("Message") -> Testing if transaction is reverted with certain message 

            expect (await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance)
        })

        it(`Should update balances after transfers`, async()=>{
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address)
            await hardhatToken.transfer(bob.address, 100);
            await hardhatToken.transfer(lucy.address, 70)

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address)
            expect(finalOwnerBalance).to.equal(initialOwnerBalance-170)

            const bobBalance = await hardhatToken.balanceOf(bob.address);
            expect(bobBalance).to.equal(100)

            const lucyBalance = await hardhatToken.balanceOf(lucy.address);
            expect(lucyBalance).to.equal(70)

        })
    })
})
