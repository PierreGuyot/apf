import { Block, IhcState } from "./immunohistochemistry/helpers";

export const aMockBlock1 = (): Block => ({
  index: 1,
  antibodies: [
    { type: "P504S/P63", clone: "M-13H4", result: "invasive-carcinoma" },
    {
      type: "others",
      values: [
        { name: "other_1", clone: "clone_1", result: "bénin" },
        { name: "other_2", clone: "clone_2", result: "malin" },
      ],
    },
  ],
});

export const aMockBlock2 = (): Block => ({
  index: 3,
  antibodies: [
    { type: "P63", clone: "M-4A4", result: "benign" },
    { type: "CK14/CK15", clone: "SP53", result: "intraepithelial-lesion" },
    {
      type: "others",
      values: [{ name: "other_3", clone: "clone_3", result: "bénin" }],
    },
  ],
});

export const aMockIhcState = (): IhcState => ({
  hasIhc: true,
  blocks: [aMockBlock1(), aMockBlock2()],
});
