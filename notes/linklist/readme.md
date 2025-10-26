single linked list 

Define what a singly linked list is
Compare and contrast linked lists with array.
Implement insertion, removal and traversal methods on sinlgy lists.


link list 

A data structutr that contains a head, tail and length property.
Linked list consist of nodes, and each node has a value and a pointer to another node or null.



Head                     tail

4   -->  6  -->  8  -->   2  -->  
    next   next     next     null




comparisons with array


list

do not have indexes
connected via nodes with a next pointer
random access is not allowed



Array

Indexed is order
Insertion and deletion can be expensive 
Can quickly be accessed at a specific index


class Node{
    constructor(val){ 
        this.val = val;
        this.next = null;
    }
}



varfirst = new Node("Hi);
first.next = new Node("there");
first.next.next = new Node("How);
first.next.next.next = new Node("are");
first.next.next.next.next = new Node("You);









push pseudocode


This function should accept a value
Create a new node using the value passed to the function
If there is no head property on the list, set the head and tail to be the newly created node.
Otherwise set the next property on the tail to be the new node and set the tail property on the list to be newly created node.
Increment the length by one
Return the link list.




class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

push(val){
    var newNode = new Node(val);
    if(!this.head){
        this.head = newNode;
        this.tail = this.head;
    }else{
        this.tail.next = newNode;
        this.tail = newNode;
    }
    this.length++;
    return this;
}
}





var list = new SinglyLinkedList();
list.push("hello");
list.push("GoodBye")



console.log("list",list.head.val)