/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface FileSwapInterface extends utils.Interface {
  functions: {
    "_balances(address,address)": FunctionFragment;
    "_balancesUSDC(address)": FunctionFragment;
    "stake(address[],uint256[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "_balances" | "_balancesUSDC" | "stake"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_balances",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "_balancesUSDC",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [string[], BigNumberish[]]
  ): string;

  decodeFunctionResult(functionFragment: "_balances", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_balancesUSDC",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;

  events: {};
}

export interface FileSwap extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FileSwapInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _balances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _balancesUSDC(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    stake(
      _tokens: string[],
      _amounts: BigNumberish[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  _balances(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _balancesUSDC(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  stake(
    _tokens: string[],
    _amounts: BigNumberish[],
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    _balances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _balancesUSDC(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    stake(
      _tokens: string[],
      _amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    _balances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _balancesUSDC(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    stake(
      _tokens: string[],
      _amounts: BigNumberish[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _balances(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _balancesUSDC(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stake(
      _tokens: string[],
      _amounts: BigNumberish[],
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}