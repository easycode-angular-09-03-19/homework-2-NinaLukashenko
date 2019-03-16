/**task 1 */
function addItemInfoDecorator(
  target: Object,
  method: string,
  descriptor: PropertyDescriptor
) {
  let origFunc = descriptor.value;

  descriptor.value = function() {
    let newResult =
      origFunc.apply(this).name + " - $" + origFunc.apply(this).price;

    return {
      data: new Date(),
      info: newResult
    };
  };
}

class Item {
  public price: number;
  public name: string;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  @addItemInfoDecorator
  public getItemInfo() {
    return {
      name: this.name,
      price: this.price
    };
  }
}

let item = new Item("Apple", 100);

console.log(item.getItemInfo());

/**task 2 */
function UserDecorator(type: string) {
  return function(targetClass) {
    return class {
      public createDate = new Date();
      public type = type;
    };
  };
}

@UserDecorator("admin")
class User {}

const boris = new User();

console.log(boris);

/**task 3 */
namespace USA {
  export interface INews {
    id: number;
    title: string;
    text: string;
    author: string;
  }

  export class NewsService {
    protected apiurl: string = "https://news_api_usa_url";
    public getNews() {} // method
  }
}

namespace Ukraine {
  export interface INews2 {
    uuid: string;
    title: string;
    body: string;
    author: string;
    date: string;
    imgUrl: string;
  }

  export class NewsService2 {
    protected apiurl: string = "https://news_api_2_url";
    public getNews() {} // method get all news
    public addToFavorite() {} // method add to favorites
  }
}

/**task 4 */
class Junior {
  doTasks() {
    console.log("Actions!!!");
  }
}

class Middle {
  createApp() {
    console.log("Creating!!!");
  }
}

class Senior implements Junior, Middle {
  doTasks(): void {}
  createApp(): void {}
  createArchitecture(): void {
    console.log("Hello from method createArchitecture!");
  }
}

applyMixins(Senior, [Junior, Middle]);

function applyMixins(targetClass: any, baseClasses: any[]) {
  baseClasses.forEach(baseClass => {
    Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
      targetClass.prototype[name] = baseClass.prototype[name];
    });
  });
}

const colleague = new Senior();

console.log(colleague.doTasks());
console.log(colleague.createApp());
console.log(colleague.createArchitecture());
