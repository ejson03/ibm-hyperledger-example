/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { MedicalContract } from '.';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import winston = require('winston');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext implements Context {
    public stub: sinon.SinonStubbedInstance<ChaincodeStub> = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: sinon.SinonStubbedInstance<ClientIdentity> = sinon.createStubInstance(ClientIdentity);
    public logger = {
        getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
        setLevel: sinon.stub(),
     };
}

describe('MedicalContract', () => {

    let contract: MedicalContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new MedicalContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"medical 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"medical 1002 value"}'));
    });

    describe('#medicalExists', () => {

        it('should return true for a medical', async () => {
            await contract.medicalExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a medical that does not exist', async () => {
            await contract.medicalExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createMedical', () => {

        it('should create a medical', async () => {
            await contract.createMedical(ctx, '1003', 'medical 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"medical 1003 value"}'));
        });

        it('should throw an error for a medical that already exists', async () => {
            await contract.createMedical(ctx, '1001', 'myvalue').should.be.rejectedWith(/The medical 1001 already exists/);
        });

    });

    describe('#readMedical', () => {

        it('should return a medical', async () => {
            await contract.readMedical(ctx, '1001').should.eventually.deep.equal({ value: 'medical 1001 value' });
        });

        it('should throw an error for a medical that does not exist', async () => {
            await contract.readMedical(ctx, '1003').should.be.rejectedWith(/The medical 1003 does not exist/);
        });

    });

    describe('#updateMedical', () => {

        it('should update a medical', async () => {
            await contract.updateMedical(ctx, '1001', 'medical 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"medical 1001 new value"}'));
        });

        it('should throw an error for a medical that does not exist', async () => {
            await contract.updateMedical(ctx, '1003', 'medical 1003 new value').should.be.rejectedWith(/The medical 1003 does not exist/);
        });

    });

    describe('#deleteMedical', () => {

        it('should delete a medical', async () => {
            await contract.deleteMedical(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a medical that does not exist', async () => {
            await contract.deleteMedical(ctx, '1003').should.be.rejectedWith(/The medical 1003 does not exist/);
        });

    });

});
