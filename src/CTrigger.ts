import {CEntity_VTables} from "./constants";

export class CTrigger {
  constructor(public address: number) {

  }

  static isTrigger(entity: CEntity) {
    return entity.vtable == CEntity_VTables.CTrigger;
  }
}
