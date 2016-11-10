#ifndef __COMPRESS_WORKER_H__
#define __COMPRESS_WORKER_H__
#include <node.h>
#include <v8.h>
#include <string>
#include "nan.h"

class CompressWorker : public Nan::AsyncWorker {

  public:
    CompressWorker(std::string *input, Nan::Callback *callback)
      : Nan::AsyncWorker(callback), input(input) {}
    ~CompressWorker();
    void Execute ();
    void HandleOkCallback();

  private:
    std::string *input;
    std::string dst;
};

#endif /* __COMPRESS_WORKER_H__ */