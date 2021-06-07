/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Medical } from './medical';

@Info({title: 'MedicalContract', description: 'My Smart Contract' })
export class MedicalContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async medicalExists(ctx: Context, medicalId: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(medicalId);
        return (!!data && data.length > 0);
    }

    @Transaction()
    public async createMedical(ctx: Context, medicalId: string, value: string): Promise<void> {
        const exists: boolean = await this.medicalExists(ctx, medicalId);
        if (exists) {
            throw new Error(`The medical ${medicalId} already exists`);
        }
        const medical: Medical = new Medical();
        medical.value = value;
        const buffer: Buffer = Buffer.from(JSON.stringify(medical));
        await ctx.stub.putState(medicalId, buffer);
    }

    @Transaction(false)
    @Returns('Medical')
    public async readMedical(ctx: Context, medicalId: string): Promise<Medical> {
        const exists: boolean = await this.medicalExists(ctx, medicalId);
        if (!exists) {
            throw new Error(`The medical ${medicalId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(medicalId);
        const medical: Medical = JSON.parse(data.toString()) as Medical;
        return medical;
    }

    @Transaction()
    public async updateMedical(ctx: Context, medicalId: string, newValue: string): Promise<void> {
        const exists: boolean = await this.medicalExists(ctx, medicalId);
        if (!exists) {
            throw new Error(`The medical ${medicalId} does not exist`);
        }
        const medical: Medical = new Medical();
        medical.value = newValue;
        const buffer: Buffer = Buffer.from(JSON.stringify(medical));
        await ctx.stub.putState(medicalId, buffer);
    }

    @Transaction()
    public async deleteMedical(ctx: Context, medicalId: string): Promise<void> {
        const exists: boolean = await this.medicalExists(ctx, medicalId);
        if (!exists) {
            throw new Error(`The medical ${medicalId} does not exist`);
        }
        await ctx.stub.deleteState(medicalId);
    }

}
