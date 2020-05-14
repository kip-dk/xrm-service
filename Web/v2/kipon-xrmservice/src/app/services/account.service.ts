import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { XrmQueryResult, XrmContextService, Entity, Entities, EntityReference, OptionSetValue, Condition, Operator, Comparator, Fetchxml } from 'kipon-xrmservice';

export class Account extends Entity {
  constructor() {
    super('accounts', 'accountid', false);
  }
  accountnumber: string = null;
  primarycontactid: EntityReference = new EntityReference().meta("contacts", "primarycontactid");
  creditlimit: number = null;
  industrycode: OptionSetValue = new OptionSetValue();
  transactioncurrencyid: EntityReference = new EntityReference().meta("transactioncurrencies", "transactioncurrencyid@odata.bind");

  name: string = null;

  fromfetch: string;

  meta(): Account {
    return this;
  }
  onFetch(): void {
    console.log('hello from account service for account:' + this.id);
    this.fromfetch = "from fetch " + this.creditlimit;
  }
}

export class LocalContact extends Entity {
  constructor() {
    super("contacts", "contactid", true);
  }
  name: string = null;
}

@Injectable()
export class AccountService {
  private localPrototype: Account = new Account().meta();
  private contactProto: LocalContact = new LocalContact();

  constructor(private xrmService: XrmContextService) { }

  query(): Observable<XrmQueryResult<Account>> {
    let condition: Condition = new Condition().isActive();
    return this.xrmService.query<Account>(this.localPrototype, condition);
  }

  queryByXml(): Observable<XrmQueryResult<Account>> {
    let condition: Condition = new Condition().isActive();
    let fetchxml = new Fetchxml(this.localPrototype, condition);

    let contactCondition: Condition = new Condition()
      .where("firstname", Comparator.StartsWith, "Mic");

    let link = fetchxml.entity().link(this.contactProto, "primarycontactid", contactCondition);
    var xml = fetchxml.toFetchXml();
    console.log(xml);
    return this.xrmService.fetchxml(this.localPrototype, xml);
  }
}
