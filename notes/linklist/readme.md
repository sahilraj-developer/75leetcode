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