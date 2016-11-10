#ifndef COMPRESSION_NODE_UNCOMPRESS_WORKER_H
#define COMPRESSION_NODE_UNCOMPRESS_WORKER_H

#include <node.h>
#include <v8.h>
#include <string>
#include "nan.h"

class UncompressWorker : public Nan::AsyncWorker {

  public:
    UncompressWorker(std::string *input, bool asBuffer, Nan::Callback *callback)
      : Nan::AsyncWorker(callback), input(input), asBuffer(asBuffer) {}
    ~UncompressWorker();

    void Execute();
    void HanldeOkCallback();

  private:
    std::string *input;
    std::string dst;
    bool asBuffer;

};

#endif //COMPRESSION_NODE_UNCOMPRESS_WORKER_H
