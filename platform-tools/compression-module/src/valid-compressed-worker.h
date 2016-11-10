#ifndef COMPRESSION_NODE_VALID_COMPRESSED_WORKER_H
#define COMPRESSION_NODE_VALID_COMPRESSED_WORKER_H
#include <node.h>
#include <v8.h>
#include <string>
#include "nan.h"

class IsValidCompressedWorker : public Nan::AsyncWorker {
  public:
    IsValidCompressedWorker(std::string *input, Nan::Callback *callback)
      : Nan::AsyncWorker(callback), input(input) {}
    ~IsValidCompressedWorker();

    void Execute();
    void HandleOkCallback();

  private:
    std::string *input;
    bool res;
};

#endif //COMPRESSION_NODE_VALID_COMPRESSED_WORKER_H
