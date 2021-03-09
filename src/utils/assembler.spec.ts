import {
  opcodeADCS,
  opcodeADDreg,
  opcodeADDS1,
  opcodeADDS2,
  opcodeADDsp2,
  opcodeADDSreg,
  opcodeADR,
  opcodeANDS,
  opcodeBICS,
  opcodeBL,
  opcodeBLX,
  opcodeBX,
  opcodeLDMIA,
  opcodeLDRB,
  opcodeLDRBreg,
  opcodeLDRH,
  opcodeLDRHreg,
  opcodeLDRreg,
  opcodeLDRSB,
  opcodeLDRSH,
  opcodeLSLSreg,
  opcodeLSRS,
  opcodeMOV,
  opcodeMRS,
  opcodeMSR,
  opcodeORRS,
  opcodePOP,
  opcodeRSBS,
  opcodeSBCS,
  opcodeSTMIA,
  opcodeSTR,
  opcodeSTRB,
  opcodeSTRBreg,
  opcodeSTRH,
  opcodeSTRHreg,
  opcodeSTRreg,
  opcodeSUBS1,
  opcodeSUBS2,
  opcodeSUBsp,
  opcodeSUBSreg,
  opcodeUXTB,
} from './assembler';

const r0 = 0;
const r1 = 1;
const r2 = 2;
const r3 = 3;
const r4 = 4;
const r5 = 5;
const r6 = 6;
const r7 = 7;
const r8 = 8;
const ip = 12;
const lr = 14;
const pc = 15;

const PRIMASK = 16;

describe('assembler', () => {
  it('should correctly encode an `adc r3, r0` instruction', () => {
    expect(opcodeADCS(r3, r0)).toEqual(0x4143);
  });

  it('should correctly encode an `add sp, #12` instruction', () => {
    expect(opcodeADDsp2(12)).toEqual(0xb003);
  });

  it('should correctly encode an `adds r0, r3, #0` instruction', () => {
    expect(opcodeADDS1(r0, r3, 0)).toEqual(0x1c18);
  });

  it('should correctly encode an `adds r1, r1, r3` instruction', () => {
    expect(opcodeADDSreg(r1, r1, r3)).toEqual(0x18c9);
  });

  it('should correctly encode an `add r1, ip` instruction', () => {
    expect(opcodeADDreg(r1, ip)).toEqual(0x4461);
  });

  it('should correctly encode an `adds r1, #1` instruction', () => {
    expect(opcodeADDS2(r1, 1)).toEqual(0x3101);
  });

  it('should correctly encode an `ands r5, r0` instruction', () => {
    expect(opcodeANDS(r5, r0)).toEqual(0x4005);
  });

  it('should correctly encode an `adr r4, #52` instruction', () => {
    expect(opcodeADR(r4, 52)).toEqual(0xa40d);
  });

  it('should correctly encode an `bics r0, r3` instruction', () => {
    expect(opcodeBICS(r0, r3)).toEqual(0x4398);
  });

  it('should correctly encode an `bl .-198` instruction', () => {
    expect(opcodeBL(-198)).toEqual(0xff9df7ff);
  });

  it('should correctly encode an `bl .+10` instruction', () => {
    expect(opcodeBL(10)).toEqual(0xf805f000);
  });

  it('should correctly encode an `bl .-3242` instruction', () => {
    expect(opcodeBL(-3242)).toEqual(0xf9abf7ff);
  });

  it('should correctly encode an `blx r1` instruction', () => {
    expect(opcodeBLX(r1)).toEqual(0x4788);
  });

  it('should correctly encode an `bx lr` instruction', () => {
    expect(opcodeBX(lr)).toEqual(0x4770);
  });

  it('should correctly encode an `ldmia r0!, {r1, r2}` instruction', () => {
    expect(opcodeLDMIA(r0, (1 << r1) | (1 << r2))).toEqual(0xc806);
  });

  it('should correctly encode an `lsls r5, r0` instruction', () => {
    expect(opcodeLSLSreg(r5, r0)).toEqual(0x4085);
  });

  it('should correctly encode an `lsrs r1, r1, #1` instruction', () => {
    expect(opcodeLSRS(r1, r1, 1)).toEqual(0x0849);
  });

  it('should correctly encode an `ldr r3, [r3, r4]', () => {
    expect(opcodeLDRreg(r3, r3, r4)).toEqual(0x591b);
  });

  it('should correctly encode an `ldrb r0, [r1, #0]` instruction', () => {
    expect(opcodeLDRB(r0, r1, 0)).toEqual(0x7808);
  });

  it('should correctly encode an `ldrb r2, [r5, r4]` instruction', () => {
    expect(opcodeLDRBreg(r2, r5, r4)).toEqual(0x5d2a);
  });

  it('should correctly encode an `ldrh r3, [r0, #2]` instruction', () => {
    expect(opcodeLDRH(r3, r0, 2)).toEqual(0x8843);
  });

  it('should correctly encode an `ldrh r4, [r0, r1]` instruction', () => {
    expect(opcodeLDRHreg(r4, r0, r1)).toEqual(0x5a44);
  });

  it('should correctly encode an `ldrsb r3, [r2, r3]` instruction', () => {
    expect(opcodeLDRSB(r3, r2, r3)).toEqual(0x56d3);
  });

  it('should correctly encode an `ldrsh r5, [r3, r5]` instruction', () => {
    expect(opcodeLDRSH(r5, r3, r5)).toEqual(0x5f5d);
  });

  it('should correctly encode an `mov r3, r8` instruction', () => {
    expect(opcodeMOV(r3, r8)).toEqual(0x4643);
  });

  it('should correctly encode an `mrs r6, PRIMASK` instruction', () => {
    expect(opcodeMRS(r6, PRIMASK)).toEqual(0x8610f3ef);
  });

  it('should correctly encode an `msr PRIMASK, r6` instruction', () => {
    expect(opcodeMSR(PRIMASK, r6)).toEqual(0x8810f386);
  });

  it('should correctly encode an `prrs r3, r0` instruction', () => {
    expect(opcodeORRS(r3, r0)).toEqual(0x4303);
  });

  it('should correctly encode an `pop {r0, r1, pc}` instruction', () => {
    expect(opcodePOP(true, (1 << r0) | (1 << r1))).toEqual(0xbd03);
  });

  it('should correctly encode an `rsbs r0, r3` instruction', () => {
    expect(opcodeRSBS(r0, r3)).toEqual(0x4258);
  });

  it('should correctly encode an `sbcs r0, r3` instruction', () => {
    expect(opcodeSBCS(r0, r3)).toEqual(0x4198);
  });

  it('should correctly encode an `stmia r2!, {r0}` instruction', () => {
    expect(opcodeSTMIA(r2, 1 << r0)).toEqual(0xc201);
  });

  it('should correctly encode an `str r6, [r4, #20]` instruction', () => {
    expect(opcodeSTR(r6, r4, 20)).toEqual(0x6166);
  });

  it('should correctly encode an `str r2, [r1, r4]` instruction', () => {
    expect(opcodeSTRreg(r2, r1, r4)).toEqual(0x510a);
  });

  it('should correctly encode an `strb r3, [r2, #0]` instruction', () => {
    expect(opcodeSTRB(r3, r2, 0)).toEqual(0x7013);
  });

  it('should correctly encode an `strb r3, [r2, r5]` instruction', () => {
    expect(opcodeSTRBreg(r3, r2, r5)).toEqual(0x5553);
  });

  it('should correctly encode an `strh r1, [r3, #4]` instruction', () => {
    expect(opcodeSTRH(r1, r3, 4)).toEqual(0x8099);
  });

  it('should correctly encode an `strh r1, [r3, r2]` instruction', () => {
    expect(opcodeSTRHreg(r1, r3, r2)).toEqual(0x5299);
  });

  it('should correctly encode an `sub sp, #12` instruction', () => {
    expect(opcodeSUBsp(12)).toEqual(0xb083);
  });

  it('should correctly encode an `subs r3, r0, #1` instruction', () => {
    expect(opcodeSUBS1(r3, r0, 1)).toEqual(0x1e43);
  });

  it('should correctly encode an `subs r1, r1, r0` instruction', () => {
    expect(opcodeSUBSreg(r1, r1, r0)).toEqual(0x1a09);
  });

  it('should correctly encode an `subs r3, #13` instruction', () => {
    expect(opcodeSUBS2(r3, 13)).toEqual(0x3b0d);
  });

  it('should correctly encode an `uxtb r3, r3` instruction', () => {
    expect(opcodeUXTB(r3, r3)).toEqual(0xb2db);
  });
});
