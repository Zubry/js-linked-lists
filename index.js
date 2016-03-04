'use strict';

const linkedlist = (function(){
  const spawn_node = function(value){
    return {
      'prev': null,
      'next': null,
      'value': value
    };
  };

  const append_node = function(node, value){
    const next = spawn_node(value);
    next.prev = node;
    node.next = prev;
    return node;
  };

  const create = function(values){
    if(values.length === 0){
      return spawn_node(null);
    }else{
      const head = spawn_node(values[0]);
      head.next = create_prev(values.slice(1), head);
      return head;
    }
  };

  const create_prev = function(values, prev){
    if(values.length === 0){
      return null;
    }else{
      const head = spawn_node(values[0]);
      head.prev = prev;
      head.next = create(values.slice(1), head);
      return head;
    }
  };

  const head = function(list){
    return list.value;
  };

  const tail = function(list){
    return list.next;
  };

  const last = function(list){
    let tl = tail(list);

    if(tl === null){
      return list;
    }

    return last(tl);
  };

  const append = function(list, value){
    const l = last(list);
    append_node(l, value);
    return l;
  };

  const prepend = function(list, value){
    const node = spawn_node(value);
    node.next = list;

    const hd = head(list);
    hd.prev = node;

    return node;
  };

  const reduce = function(list, fn, acc){
    if(typeof acc === undefined){
      acc = 0;
    }

    if(list === null){
      return acc;
    }

    if(head(list) === null){
      return acc;
    }

    const hd = head(list);
    const tl = tail(list);

    const updated_acc = fn(hd, acc);

    return reduce(tl, fn, updated_acc);
  };

  const reduce_r = function(list, fn, acc){
    if(typeof acc === undefined){
      acc = 0;
    }

    if(list === null){
      return acc;
    }

    const hd = last(list);
    const tl = hd.prev;

    const update_acc = fn(hd, acc);

    return reduce_r(tl, fn, updated_acc);
  };

  const map = function(list, fn){
    const copy = spawn_node(fn(head(list)));

    reduce(tail(list), function(e, acc){
      const node = spawn_node(fn(e));
      acc.next = node;
      node.prev = acc;
      return node;
    }, copy);

    return copy;
  };

  const each = function(list, fn){
    map(list, fn);
  };

  const filter = function(list, fn){
    const copy = spawn_node(undefined);

    reduce(list, function(e, acc){
      const candidate = fn(e);

      if(candidate){
        const node = spawn_node(e);
        acc.next = node;
        node.prev = acc;
        return node;
      }else{
        return acc;
      }
    }, copy);

    return tail(copy);
  };

  const length = function(list){
    return reduce(list, function(e, acc){
      return acc + 1;
    }, 0);
  };

  const every = function(list, fn){
    return length(filter(list, fn)) === length(list);
  };

  const some = function(list, fn){
    return length(filter(list, fn)) > 0;
  };

  const none = function(list, fn){
    return !some(list, fn);
  };

  const to_array = function(list){
    return reduce(list, function(e, acc){
      return acc.concat(e);
    }, []);
  };

  const print = function(list){
    console.log(to_array(list));
  };

  return {
    'create': create,
    'head': head,
    'hd': head,
    'tail': tail,
    'tl': tail,
    'last': last,
    'append': append,
    'prepend': prepend,
    'reduce': reduce,
    'reduce_r': reduce_r,
    'foldl': reduce,
    'foldr': reduce_r,
    'map': map,
    'each': each,
    'filter': filter,
    'length': length,
    'every': every,
    'all': every,
    'some': some,
    'none': none,
    'to_array': to_array,
    'print': print
  };
})();

module.exports = linkedlist;
